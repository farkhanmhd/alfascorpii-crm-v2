'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postFuResult, putFuResult, deleteFuResult } from '../../data/furesult';

const furesultSchema = z.object({
  id: z.number(),
  fu_result_name: z.string().min(1, { message: 'Fu result name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createFuResultSchema = furesultSchema.omit({ id: true });

export const addFuResultAction = actionClient
  .schema(createFuResultSchema)
  .action(async ({ parsedInput: { fu_result_name, status } }) => {
    try {
      await postFuResult(fu_result_name, status);
      revalidatePath('/furesult');
      return { status: 'success', message: 'Fu result added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Fu result',
      };
    }
  });

export const editFuResultAction = actionClient
  .schema(furesultSchema)
  .action(async ({ parsedInput: { id, fu_result_name, status } }) => {
    try {
      await putFuResult(id, fu_result_name, status);
      revalidatePath('/furesult');
      return { status: 'success', message: 'Fu result updated successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Fu result',
      };
    }
  });

const deleteFuResultSchema = z.object({
  id: z.number(),
});

export const removeFuResultAction = actionClient
  .schema(deleteFuResultSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteFuResult(id);
      revalidatePath('/furesult');
      return { status: 'success', message: 'Fu result deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Fu result',
      };
    }
  });
