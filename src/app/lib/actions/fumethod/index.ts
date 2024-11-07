'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postFuMethod, putFuMethod, deleteFuMethod } from '../../data/fumethod';

const fumethodSchema = z.object({
  id: z.number(),
  fu_method_name: z.string().min(1, { message: 'Fu method name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createFuMethodSchema = fumethodSchema.omit({ id: true });

export const addFuMethodAction = actionClient
  .schema(createFuMethodSchema)
  .action(async ({ parsedInput: { fu_method_name, status } }) => {
    try {
      await postFuMethod(fu_method_name, status);
      revalidatePath('/fumethod');
      return { status: 'success', message: 'Fu method added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Fu method',
      };
    }
  });

export const editFuMethodAction = actionClient
  .schema(fumethodSchema)
  .action(async ({ parsedInput: { id, fu_method_name, status } }) => {
    try {
      await putFuMethod(id, fu_method_name, status);
      revalidatePath('/fumethod');
      return {
        status: 'success',
        message: 'Fu method updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Fu method',
      };
    }
  });

const deleteFuMethodSchema = z.object({
  id: z.number(),
});

export const removeFuMethodAction = actionClient
  .schema(deleteFuMethodSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteFuMethod(id);
      revalidatePath('/fumethod');
      return { status: 'success', message: 'Fu method deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Fu method',
      };
    }
  });
