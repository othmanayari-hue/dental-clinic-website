import { NextRequest } from 'next/server';
import { trackVisit } from '@/lib/visitor-tracker';
import { ok, badRequest, serverError } from '@/lib/api-response';
import { generalLimiter } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  try {
    const body = await req.json().catch(() => ({}));
    const page = typeof body?.page === 'string' ? body.page.slice(0, 255) : '/';

    await trackVisit(req, page);

    return ok({ tracked: true });
  } catch {
    return serverError();
  }
}
