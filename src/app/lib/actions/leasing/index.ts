'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  addNewLeasing,
  updateLeasing,
  removeLeasing,
} from '../../data/leasing';

const addLeasingSchema = z.object({
  leasing: z.string().min(1, { message: 'Leasing name is required' }),
});

export const addLeasingAction = actionClient
  .schema(addLeasingSchema)
  .action(async ({ parsedInput: { leasing } }) => {
    try {
      await addNewLeasing(leasing);
      revalidatePath('/leasing');
      return { status: 'success', message: 'Leasing added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Leasing',
      };
    }
  });

const updateLeasingSchema = z.object({
  id: z.number(),
  leasing: z.string().min(1, { message: 'Leasing name is required' }),
});

export const updateLeasingAction = actionClient
  .schema(updateLeasingSchema)
  .action(async ({ parsedInput: { id, leasing } }) => {
    try {
      await updateLeasing(id, leasing);
      revalidatePath('/leasing');
      revalidatePath(`/leasing/${id}`);
      return {
        status: 'success',
        message: 'Leasing updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Leasing',
      };
    }
  });

const deleteLeasingSchema = z.object({
  id: z.number(),
});

export const removeLeasingAction = actionClient
  .schema(deleteLeasingSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await removeLeasing(id);
      revalidatePath('/leasing');
      return { status: 'success', message: 'Leasing deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Leasing',
      };
    }
  });
