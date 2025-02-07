'use server';

import actionClient from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { deleteDuplicate, manualAssignDuplicate } from '../../data/duplicate';

const deleteDuplicateSchema = z.object({
  ids: z
    .array(z.number().min(1, { message: 'Customer ID should be a number' }))
    .min(1, { message: 'At least one customer ID is required' }),
});

export const deleteDuplicateAction = actionClient
  .schema(deleteDuplicateSchema)
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

const manualAssignSchema = z.object({
  ids: z
    .array(z.number().min(1, { message: 'Customer ID should be a number' }))
    .min(1, { message: 'At least one customer ID is required' }),
  user_id: z.string().min(1, { message: 'User ID is required' }),
});

export const manualAssignDuplicateAction = actionClient
  .schema(manualAssignSchema)
  .action(async ({ parsedInput: { ids, user_id } }) => {
    try {
      const meta: { status: string; message: string } =
        await manualAssignDuplicate({ ids, user_id });
      revalidatePath('/duplicatedata');
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
