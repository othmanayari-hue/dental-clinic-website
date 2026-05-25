import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email invalide')
    .transform((v) => v.toLowerCase().trim()),

  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128),
});

export const createAdminSchema = z.object({
  name: z.string().min(2).max(100).transform((v) => v.trim()),
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']).default('ADMIN'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
