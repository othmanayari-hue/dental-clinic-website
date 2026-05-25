import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api-response';
import { generalLimiter } from '@/lib/rate-limit';
import { updateAppointmentSchema } from '@/validators/appointment';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return notFound('Rendez-vous introuvable');
    return ok(appointment);
  } catch {
    return serverError();
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = updateAppointmentSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) return notFound('Rendez-vous introuvable');

    const updated = await prisma.appointment.update({
      where: { id },
      data: parsed.data,
    });

    return ok(updated, 'Statut mis à jour avec succès');
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) return notFound('Rendez-vous introuvable');

    await prisma.appointment.delete({ where: { id } });
    return ok({ id }, 'Rendez-vous supprimé avec succès');
  } catch {
    return serverError();
  }
}
