import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, unauthorized, notFound, serverError } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: auth.sub },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!admin) return notFound('Compte introuvable');

    return ok(admin);
  } catch {
    return serverError();
  }
}
