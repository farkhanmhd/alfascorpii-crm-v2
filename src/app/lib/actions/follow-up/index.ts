'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { randomAssignFollowUp } from '../../data/follow-up';

const randomAssignSchema = z.object({
  amount: z
    .number()
    .min(1, { message: 'Amount is required and greater than 0' }),
  user_id: z.string().min(1, { message: 'User ID is required' }),
});

export const randomAssignFollowUpAction = actionClient
  .schema(randomAssignSchema)
  .action(async ({ parsedInput: { amount, user_id } }) => {
    try {
      const meta: { status: string; message: string } =
        await randomAssignFollowUp({ amount, user_id });
      revalidatePath('/follow-up');
      revalidatePath('/customers');
      return { status: meta.status, message: meta.message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to assign Follow-up',
        error,
      };
    }
  });
