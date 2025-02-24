'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postDetailFu, putDetailFu, deleteDetailFu } from '../../data/detailfu';

const detailfuSchema = z.object({
  id: z.number(),
  status_fu_id: z.string(),
  detail_fu_name: z.string().min(1, { message: 'Detail fu name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createDetailFuSchema = detailfuSchema.omit({ id: true });

export const addDetailFuAction = actionClient
  .schema(createDetailFuSchema)
  .action(async ({ parsedInput: { status_fu_id, detail_fu_name, status } }) => {
    try {
      await postDetailFu(status_fu_id, detail_fu_name, status);
      revalidatePath('/detailfu');
      revalidateTag('detailfu');
      return { status: 'success', message: 'Detail fu added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Detail fu',
        error,
      };
    }
  });

export const updateDetailFuAction = actionClient
  .schema(detailfuSchema)
  .action(
    async ({ parsedInput: { id, status_fu_id, detail_fu_name, status } }) => {
      try {
        await putDetailFu(id, status_fu_id, detail_fu_name, status);
        revalidatePath('/detailfu');
        revalidateTag('detailfu');
        return { status: 'success', message: 'Detail fu updated successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to update Detail fu',
        };
      }
    }
  );

const deleteDetailFuSchema = z.object({
  id: z.number(),
});

export const removeDetailFuAction = actionClient
  .schema(deleteDetailFuSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteDetailFu(id);
      revalidatePath('/detailfu');
      revalidateTag('detailfu');
      return { status: 'success', message: 'Detail fu deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Detail fu',
      };
    }
  });
