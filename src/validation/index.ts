import { z } from 'zod';

const searchQuerySchema = z.object({
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
    .refine((val) => !Number.isNaN(val) && [20, 30, 40, 50].includes(val), {
      message: 'Limit must be one of the allowed values: 20, 30, 40, 50',
    })
    .default('20'), // Default to '10'
});

export const staffQuerySchema = searchQuerySchema.extend({});
export const dealerQuerySchema = searchQuerySchema.extend({});