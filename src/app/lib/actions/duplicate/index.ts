'use server';

import actionClient from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { deleteDuplicate } from '../../data/duplicate';

const manualAssignSchema = z.object({
  ids: z
    .array(z.number().min(1, { message: 'Customer ID should be a number' }))
    .min(1, { message: 'At least one customer ID is required' }),
});

export const deleteDuplicateAction = actionClient
  .schema(manualAssignSchema)
  .action(async ({ parsedInput: { ids } }) => {
    try {
      const meta: { status: string; message: string } = await deleteDuplicate({
        ids,
      });
      revalidatePath('/duplicatedata');
      revalidatePath('/customers');
      return { status: meta.status, message: meta.message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Duplicate',
        error,
      };
    }
  });
