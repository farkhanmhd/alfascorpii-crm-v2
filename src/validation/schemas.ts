import { z } from 'zod';

export const searchQuerySchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && val >= 1, {
      message: 'Page must be a number greater than 0',
    })
    .default('1'),
  per_page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && [20, 30, 40, 50].includes(val), {
      message: 'per_page must be one of the allowed values: 20, 30, 40, 50',
    })
    .default('20'),
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8, { message: 'Password should contain at least 8 characters' }),
});
