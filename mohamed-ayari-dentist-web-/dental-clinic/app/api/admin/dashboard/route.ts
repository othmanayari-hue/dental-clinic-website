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
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const [
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      cancelledAppointments,
      todayAppointments,
      weekAppointments,
      totalMessages,
      unreadMessages,
      totalTestimonials,
      pendingTestimonials,
      totalGalleryImages,
      recentAppointments,
      recentMessages,
      upcomingAppointments,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'PENDING' } }),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
      prisma.appointment.count({ where: { status: 'CANCELLED' } }),
      prisma.appointment.count({ where: { createdAt: { gte: today } } }),
      prisma.appointment.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { approved: false } }),
      prisma.galleryImage.count(),
      prisma.appointment.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: {
          id: true,
          patientName: true,
          email: true,
          phone: true,
          selectedService: true,
          appointmentDate: true,
          appointmentTime: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          fullName: true,
          email: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),
      prisma.appointment.findMany({
        where: {
          appointmentDate: { gte: today },
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
        orderBy: [{ appointmentDate: 'asc' }, { appointmentTime: 'asc' }],
        take: 5,
        select: {
          id: true,
          patientName: true,
          selectedService: true,
          appointmentDate: true,
          appointmentTime: true,
          status: true,
        },
      }),
    ]);

    return ok({
      stats: {
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          cancelled: cancelledAppointments,
          today: todayAppointments,
          thisWeek: weekAppointments,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
        },
        content: {
          testimonials: totalTestimonials,
          pendingTestimonials,
          galleryImages: totalGalleryImages,
        },
      },
      recentAppointments,
      recentMessages,
      upcomingAppointments,
    });
  } catch {
    return serverError();
  }
}
