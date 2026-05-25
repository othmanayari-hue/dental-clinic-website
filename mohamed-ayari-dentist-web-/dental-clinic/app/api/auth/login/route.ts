import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import {
  signAccessToken,
  signRefreshToken,
  REFRESH_TOKEN_EXPIRY_MS,
} from '@/lib/auth';
import { ok, badRequest, unauthorized, serverError } from '@/lib/api-response';
import { authLimiter } from '@/lib/rate-limit';
import { loginSchema } from '@/validators/auth';

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Email ou mot de passe invalide');
    }

    const { email, password } = parsed.data;

    const admin = await prisma.admin.findUnique({ where: { email } });

    // Constant-time comparison to prevent timing attacks
    const dummyHash = '$2a$12$invalid.hash.for.timing.protection.only';
    const isValid = admin
      ? await bcrypt.compare(password, admin.hashedPassword)
      : await bcrypt.compare(password, dummyHash);

    if (!admin || !isValid) {
      return unauthorized('Email ou mot de passe incorrect');
    }

    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(payload),
      signRefreshToken(payload),
    ]);

    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);

    await prisma.refreshToken.create({
      data: { token: refreshToken, adminId: admin.id, expiresAt },
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          accessToken,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
        message: 'Connexion réussie',
      },
      { status: 200 }
    );

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 900,
      path: '/',
    });

    response.cookies.set('refresh_token', refreshToken, {
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
