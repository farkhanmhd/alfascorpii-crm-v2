'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { putColor, postColor, deleteColor } from '@/app/lib/data/colors';

const colorSchema = z.object({
  id: z.number(),
  color_name: z.string().min(1, { message: 'Color name is required' }),
});

const createColorSchema = colorSchema.omit({ id: true });

export const addColor = actionClient
  .schema(createColorSchema)
  .action(async ({ parsedInput: { color_name } }) => {
    try {
      await postColor(color_name);
      revalidatePath('/colors');
      revalidateTag('colors');
      return { status: 'success', message: 'Color added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add color',
      };
    }
  });

export const updateColor = actionClient
  .schema(colorSchema)
  .action(async ({ parsedInput: { id, color_name } }) => {
    try {
      await putColor(id, color_name);
      revalidatePath('/colors');
      revalidatePath(`/colors/${id}`);
      revalidateTag('colors');
      return {
        status: 'success',
        message: 'Color updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update color',
      };
    }
  });

const deleteColorSchema = z.object({
  id: z.number(),
});

export const removeColor = actionClient
  .schema(deleteColorSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteColor(id);
      revalidatePath('/colors');
      revalidateTag('colors');
      return { status: 'success', message: 'Color deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete color',
      };
    }
  });
