'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  putPekerjaan,
  postJob,
  deletePekerjaan,
} from '@/app/lib/data/customers/customerjobs';

const jobSchema = z.object({
  id: z.number(),
  job: z.string().min(1, { message: 'Job name is required' }),
  code: z.string().min(1, { message: 'Job code is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createJobSchema = jobSchema.omit({ id: true });

export const addJob = actionClient
  .schema(createJobSchema)
  .action(async ({ parsedInput: { job, code, status } }) => {
    try {
      await postJob(job, code, status);
      revalidatePath('/customerjobs');
      return { status: 'success', message: 'Pekerjaan added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Pekerjaan',
      };
    }
  });

export const updateJob = actionClient
  .schema(jobSchema)
  .action(async ({ parsedInput: { id, job, code, status } }) => {
    try {
      await putPekerjaan(id, job, code, status);
      revalidatePath('/customerjobs');
      revalidatePath(`/customerjobs/${id}`);
      return {
        status: 'success',
        message: 'Pekerjaan updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Pekerjaan',
      };
    }
  });

const deleteJobSchema = z.object({
  id: z.number(),
});

export const removeJob = actionClient
  .schema(deleteJobSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deletePekerjaan(id);
      revalidatePath('/customerjobs');
      return { status: 'success', message: 'Pekerjaan deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Pekerjaan',
      };
    }
  });
