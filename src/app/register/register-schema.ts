import { z } from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16)
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least 1 lowercase, 1 uppercase, and 1 number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
