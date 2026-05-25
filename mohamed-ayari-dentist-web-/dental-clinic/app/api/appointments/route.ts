import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, created, badRequest, unauthorized, serverError, corsHeaders } from '@/lib/api-response';
import { appointmentLimiter, generalLimiter } from '@/lib/rate-limit';
import { createAppointmentSchema } from '@/validators/appointment';
import {
  sendAppointmentConfirmationToPatient,
  sendAppointmentNotificationToAdmin,
} from '@/lib/email';
import { incrementBookingCount } from '@/lib/visitor-tracker';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  const limited = appointmentLimiter(req);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const existingPending = await prisma.appointment.findFirst({
      where: {
        email: data.email,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existingPending) {
      return badRequest('Vous avez déjà un rendez-vous à ce créneau');
    }

    const slotTaken = await prisma.appointment.findFirst({
      where: {
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (slotTaken) {
      return badRequest('Ce créneau est déjà réservé. Veuillez choisir un autre horaire.');
    }

    const appointment = await prisma.appointment.create({ data });

    await incrementBookingCount();

    // Fire emails without blocking response
    Promise.all([
      sendAppointmentConfirmationToPatient(data).catch(() => {}),
      sendAppointmentNotificationToAdmin(data).catch(() => {}),
    ]);

    return created(
      {
        id: appointment.id,
        status: appointment.status,
        patientName: appointment.patientName,
        selectedService: appointment.selectedService,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        createdAt: appointment.createdAt,
      },
      'Votre rendez-vous a été enregistré avec succès. Vous recevrez un email de confirmation.'
    );
  } catch {
    return serverError();
  }
}

export async function GET(req: NextRequest) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const status = searchParams.get('status') as string | null;
    const search = searchParams.get('search')?.trim();
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const where: Record<string, unknown> = {};

    if (status && ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { patientName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    if (dateFrom || dateTo) {
      where.appointmentDate = {
        ...(dateFrom && { gte: new Date(dateFrom) }),
        ...(dateTo && { lte: new Date(dateTo) }),
      };
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

    return ok(appointments, undefined, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    });
  } catch {
    return serverError();
  }
}
