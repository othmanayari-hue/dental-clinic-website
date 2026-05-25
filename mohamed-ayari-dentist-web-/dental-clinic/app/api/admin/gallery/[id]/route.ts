import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api-response';
import { updateGalleryImageSchema } from '@/validators/gallery';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = updateGalleryImageSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) return notFound('Image introuvable');

    const updated = await prisma.galleryImage.update({ where: { id }, data: parsed.data });
    return ok(updated, 'Image mise à jour');
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  const { id } = await params;

  try {
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) return notFound('Image introuvable');

    await prisma.galleryImage.delete({ where: { id } });
    return ok({ id }, 'Image supprimée avec succès');
  } catch {
    return serverError();
  }
}
