import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(16),
});

export type LoginSchema = z.infer<typeof loginSchema>;
