'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postDegree, putDegree, deleteDegree } from '../../data/degrees';

const degreeSchema = z.object({
  id: z.number(),
  degree: z.string().min(1, { message: 'Degree name is required' }),
  code: z.string().min(1, { message: 'Degree code is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createDegreeSchema = degreeSchema.omit({ id: true });

export const addDegreeAction = actionClient
  .schema(createDegreeSchema)
  .action(async ({ parsedInput: { degree, code, status } }) => {
    try {
      await postDegree(degree, code, status);
      revalidatePath('/degrees');
      return { status: 'success', message: 'Degree added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Degree',
      };
    }
  });

export const updateDegreeAction = actionClient
  .schema(degreeSchema)
  .action(async ({ parsedInput: { id, degree, code, status } }) => {
    try {
      await putDegree(id, degree, code, status);
      revalidatePath('/degrees');
      revalidatePath(`/degrees/${id}`);
      return {
        status: 'success',
        message: 'Degree updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Degree',
      };
    }
  });

const deleteDegreeSchema = z.object({
  id: z.number(),
});

export const removeDegreeAction = actionClient
  .schema(deleteDegreeSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteDegree(id);
      revalidatePath('/degrees');
      return { status: 'success', message: 'Degree deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Degree',
      };
    }
  });
