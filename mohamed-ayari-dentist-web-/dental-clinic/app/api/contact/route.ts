import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, created, badRequest, unauthorized, serverError, corsHeaders } from '@/lib/api-response';
import { contactLimiter, generalLimiter } from '@/lib/rate-limit';
import { createContactSchema } from '@/validators/contact';
import {
  sendContactNotificationToAdmin,
  sendContactAutoReply,
} from '@/lib/email';
import { incrementContactCount } from '@/lib/visitor-tracker';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  const limited = contactLimiter(req);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = createContactSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const message = await prisma.contactMessage.create({ data });

    await incrementContactCount();

    Promise.all([
      sendContactNotificationToAdmin(data).catch(() => {}),
      sendContactAutoReply({ fullName: data.fullName, email: data.email, subject: data.subject }).catch(() => {}),
    ]);

    return created(
      { id: message.id, createdAt: message.createdAt },
      'Votre message a été envoyé avec succès. Nous vous répondrons dans les meilleurs délais.'
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
    const unreadOnly = searchParams.get('unread') === 'true';
    const search = searchParams.get('search')?.trim();

    const where: Record<string, unknown> = {};
    if (unreadOnly) where.isRead = false;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [messages, total, unreadCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    return ok(messages, undefined, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      unreadCount,
      hasNext: page * limit < total,
      hasPrev: page > 1,
    });
  } catch {
    return serverError();
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    if (!id) return badRequest('ID requis');

    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    return ok({ id }, 'Message marqué comme lu');
  } catch {
    return serverError();
  }
}
