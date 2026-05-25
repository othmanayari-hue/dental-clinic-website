import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, serverError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } }).catch(() => {});
    }

    const response = NextResponse.json(
      { success: true, data: null, message: 'Déconnexion réussie' },
      { status: 200 }
    );

    response.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/api/auth',
    });

    return response;
  } catch {
    return serverError();
  }
}
