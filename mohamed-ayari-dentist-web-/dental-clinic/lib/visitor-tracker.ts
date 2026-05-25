import { NextRequest } from 'next/server';
import { prisma } from './prisma';

function detectDevice(ua: string): string {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua) && !/chromium/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/opera|opr\//i.test(ua)) return 'Opera';
  return 'Other';
}

function detectOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows';
  if (/macintosh|mac os x/i.test(ua)) return 'macOS';
  if (/linux/i.test(ua)) return 'Linux';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  return 'Other';
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

export async function trackVisit(
  req: NextRequest,
  page: string = '/'
): Promise<void> {
  try {
    const ua = req.headers.get('user-agent') || '';
    const ip = getClientIp(req);
    const referrer = req.headers.get('referer') || null;
    const sessionId = req.cookies.get('session_id')?.value || null;

    await prisma.websiteVisitor.create({
      data: {
        ipAddress: ip,
        deviceType: detectDevice(ua),
        browser: detectBrowser(ua),
        os: detectOS(ua),
        referrer,
        page,
        sessionId,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: { date: today },
      create: {
        date: today,
        totalVisits: 1,
        uniqueVisitors: 1,
        bookingCount: 0,
        contactMessagesCount: 0,
      },
      update: {
        totalVisits: { increment: 1 },
      },
    });
  } catch {
    // Non-critical — never crash the request
  }
}

export async function incrementBookingCount(): Promise<void> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: { date: today },
      create: {
        date: today,
        totalVisits: 0,
        uniqueVisitors: 0,
        bookingCount: 1,
        contactMessagesCount: 0,
      },
      update: { bookingCount: { increment: 1 } },
    });
  } catch {
    // Non-critical
  }
}

export async function incrementContactCount(): Promise<void> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: { date: today },
      create: {
        date: today,
        totalVisits: 0,
        uniqueVisitors: 0,
        bookingCount: 0,
        contactMessagesCount: 1,
      },
      update: { contactMessagesCount: { increment: 1 } },
    });
  } catch {
    // Non-critical
  }
}
