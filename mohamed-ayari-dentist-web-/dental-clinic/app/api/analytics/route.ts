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
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const [
      todayAnalytics,
      monthlyAnalytics,
      lastMonthAnalytics,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalMessages,
      unreadMessages,
      serviceDistribution,
      dailyVisits30d,
      appointmentsThisMonth,
      appointmentsLastMonth,
      topDevices,
      topBrowsers,
      recentAppointments,
    ] = await Promise.all([
      prisma.analytics.findFirst({ where: { date: today } }),

      prisma.analytics.aggregate({
        where: { date: { gte: monthStart } },
        _sum: { totalVisits: true, uniqueVisitors: true, bookingCount: true, contactMessagesCount: true },
      }),

      prisma.analytics.aggregate({
        where: { date: { gte: lastMonthStart, lte: lastMonthEnd } },
        _sum: { totalVisits: true, bookingCount: true },
      }),

      prisma.appointment.count(),

      prisma.appointment.count({ where: { status: 'PENDING' } }),

      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),

      prisma.contactMessage.count(),

      prisma.contactMessage.count({ where: { isRead: false } }),

      prisma.appointment.groupBy({
        by: ['selectedService'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 6,
      }),

      prisma.analytics.findMany({
        where: { date: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } },
        orderBy: { date: 'asc' },
        select: { date: true, totalVisits: true, uniqueVisitors: true, bookingCount: true },
      }),

      prisma.appointment.count({
        where: { createdAt: { gte: monthStart } },
      }),

      prisma.appointment.count({
        where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
      }),

      prisma.websiteVisitor.groupBy({
        by: ['deviceType'],
        _count: { id: true },
        where: { visitedAt: { gte: monthStart } },
        orderBy: { _count: { id: 'desc' } },
      }),

      prisma.websiteVisitor.groupBy({
        by: ['browser'],
        _count: { id: true },
        where: { visitedAt: { gte: monthStart } },
        orderBy: { _count: { id: 'desc' } },
        take: 5,
      }),

      prisma.appointment.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          patientName: true,
          selectedService: true,
          appointmentDate: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const totalVisitorsAllTime = await prisma.websiteVisitor.count();

    const totalVisitsMonthly = monthlyAnalytics._sum.totalVisits || 0;
    const totalVisitsLastMonth = lastMonthAnalytics._sum.totalVisits || 0;
    const visitGrowth =
      totalVisitsLastMonth > 0
        ? Math.round(((totalVisitsMonthly - totalVisitsLastMonth) / totalVisitsLastMonth) * 100)
        : 0;

    const bookingGrowth =
      appointmentsLastMonth > 0
        ? Math.round(((appointmentsThisMonth - appointmentsLastMonth) / appointmentsLastMonth) * 100)
        : 0;

    const conversionRate =
      totalVisitsMonthly > 0
        ? Math.round((appointmentsThisMonth / totalVisitsMonthly) * 10000) / 100
        : 0;

    return ok({
      overview: {
        totalVisitorsAllTime,
        todayVisits: todayAnalytics?.totalVisits || 0,
        monthlyVisits: totalVisitsMonthly,
        visitGrowth,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        appointmentsThisMonth,
        bookingGrowth,
        totalMessages,
        unreadMessages,
        conversionRate,
      },
      charts: {
        dailyVisits: dailyVisits30d,
        serviceDistribution: serviceDistribution.map((s: { selectedService: string; _count: { id: number } }) => ({
          service: s.selectedService,
          count: s._count.id,
        })),
        devices: topDevices.map((d: { deviceType: string | null; _count: { id: number } }) => ({
          device: d.deviceType || 'unknown',
          count: d._count.id,
        })),
        browsers: topBrowsers.map((b: { browser: string | null; _count: { id: number } }) => ({
          browser: b.browser || 'unknown',
          count: b._count.id,
        })),
      },
      recentAppointments,
    });
  } catch {
    return serverError();
  }
}
