'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  postStatusFu,
  putStatusFu,
  deleteStatusFu,
} from '@/app/lib/data/statusfus';

const statusFuSchema = z.object({
  id: z.number(),
  fu_method_id: z.string(),
  status_fu_name: z.string().min(1, { message: 'Status fu name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createStatusFuSchema = statusFuSchema.omit({ id: true });

export const addStatusFuAction = actionClient
  .schema(createStatusFuSchema)
  .action(async ({ parsedInput: { fu_method_id, status_fu_name, status } }) => {
    try {
      await postStatusFu(fu_method_id, status_fu_name, status);
      revalidatePath('/statusfus');
      return { status: 'success', message: 'Status fu added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Status fu',
      };
    }
  });

export const updateStatusFuAction = actionClient
  .schema(statusFuSchema)
  .action(
    async ({ parsedInput: { id, fu_method_id, status_fu_name, status } }) => {
      try {
        await putStatusFu(id, fu_method_id, status_fu_name, status);
        revalidatePath('/statusfus');
        return { status: 'success', message: 'Status fu updated successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to update Status fu',
        };
      }
    }
  );

const deleteStatusFuSchema = z.object({
  id: z.number(),
});

export const deleteStatusFuAction = actionClient
  .schema(deleteStatusFuSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteStatusFu(id);
      revalidatePath('/statusfus');
      return { status: 'success', message: 'Status fu deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Status fu',
      };
    }
  });
