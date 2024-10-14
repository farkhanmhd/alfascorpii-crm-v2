import { z } from 'zod';

export const staffQuerySchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && val >= 1, {
      message: 'Page must be a number greater than 0',
    })
    .default('1'), // Default to '1'
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && [10, 20, 30, 40, 50].includes(val), {
      message: 'Limit must be one of the allowed values: 10, 20, 30, 40, 50',
    })
    .default('10'), // Default to '10'
});
