import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api-response';
import { updateTestimonialSchema } from '@/validators/gallery';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = updateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return notFound('Témoignage introuvable');

    const updated = await prisma.testimonial.update({ where: { id }, data: parsed.data });
    return ok(updated, parsed.data.approved ? 'Témoignage approuvé' : 'Témoignage mis à jour');
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return notFound('Témoignage introuvable');

    await prisma.testimonial.delete({ where: { id } });
    return ok({ id }, 'Témoignage supprimé');
  } catch {
    return serverError();
  }
}
