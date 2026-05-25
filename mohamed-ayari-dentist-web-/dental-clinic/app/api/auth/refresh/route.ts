import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  REFRESH_TOKEN_EXPIRY_MS,
} from '@/lib/auth';
import { unauthorized, serverError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (!refreshToken) return unauthorized('Refresh token manquant');

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) return unauthorized('Refresh token invalide ou expiré');

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return unauthorized('Session expirée, veuillez vous reconnecter');
    }

    const admin = await prisma.admin.findUnique({ where: { id: stored.adminId } });
    if (!admin) return unauthorized('Compte introuvable');

    const tokenPayload = { sub: admin.id, email: admin.email, role: admin.role };
    const [newAccessToken, newRefreshToken] = await Promise.all([
      signAccessToken(tokenPayload),
      signRefreshToken(tokenPayload),
    ]);

    // Rotate refresh token
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        adminId: admin.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
      },
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          accessToken: newAccessToken,
          admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
        },
      },
      { status: 200 }
    );

    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 900,
      path: '/',
    });

    response.cookies.set('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: Math.floor(REFRESH_TOKEN_EXPIRY_MS / 1000),
      path: '/api/auth',
    });

    return response;
  } catch {
    return serverError();
  }
}
