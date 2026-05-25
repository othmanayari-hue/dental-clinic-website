import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest } from '@/lib/auth';
import { ok, unauthorized, serverError } from '@/lib/api-response';
import { generalLimiter } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const limited = generalLimiter(req);
  if (limited) return limited;

  const auth = await getAuthFromRequest(req);
  if (!auth) return unauthorized();

  try {
    const now = new Date();
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const [
      activeNow,
      lastHourVisits,
      todayAppointments,
      todayMessages,
      recentVisitors,
      hourlyActivity,
    ] = await Promise.all([
      prisma.websiteVisitor.count({
        where: { visitedAt: { gte: fiveMinAgo } },
      }),

      prisma.websiteVisitor.count({
        where: { visitedAt: { gte: oneHourAgo } },
      }),

      prisma.appointment.count({
        where: { createdAt: { gte: today } },
      }),

      prisma.contactMessage.count({
        where: { createdAt: { gte: today } },
      }),

      prisma.websiteVisitor.findMany({
        where: { visitedAt: { gte: oneHourAgo } },
        orderBy: { visitedAt: 'desc' },
        take: 10,
        select: {
          deviceType: true,
          browser: true,
          page: true,
          visitedAt: true,
          country: true,
        },
      }),

      // Visits per hour for the last 24h (MySQL syntax)
      prisma.$queryRaw<{ hour: number; count: bigint }[]>`
        SELECT HOUR(visitedAt) AS hour, COUNT(*) AS count
        FROM website_visitors
        WHERE visitedAt >= NOW() - INTERVAL 24 HOUR
        GROUP BY hour
        ORDER BY hour
      `,
    ]);

    return ok({
      activeNow,
      lastHourVisits,
      todayAppointments,
      todayMessages,
      recentVisitors,
      hourlyActivity: hourlyActivity.map((h: { hour: unknown; count: unknown }) => ({
        hour: Number(h.hour),
        count: Number(h.count),
      })),
      serverTime: now.toISOString(),
    });
  } catch {
    return serverError();
  }
}
