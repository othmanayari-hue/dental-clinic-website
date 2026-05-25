import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/api-response';
import { generalLimiter } from '@/lib/rate-limit';
import { createGalleryImageSchema } from '@/validators/gallery';

export async function GET(req: NextRequest) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));

    const where: Record<string, unknown> = {};
    if (category) where.category = category;

    const [images, total, categories] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        orderBy: { uploadedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.galleryImage.count({ where }),
      prisma.galleryImage.groupBy({
        by: ['category'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
    ]);

    return ok(images, undefined, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      categories: categories.map((c: { category: string; _count: { id: number } }) => ({ name: c.category, count: c._count.id })),
    });
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  try {
    const body = await req.json();
    const parsed = createGalleryImageSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Données invalides', parsed.error.flatten().fieldErrors);
    }

    const image = await prisma.galleryImage.create({ data: parsed.data });
    return created(image, 'Image ajoutée avec succès');
  } catch {
    return serverError();
  }
}
