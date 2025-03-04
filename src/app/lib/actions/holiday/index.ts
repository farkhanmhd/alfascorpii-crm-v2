'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postHoliday, putHoliday, deleteHoliday } from '../../data/holidays';

const holidaySchema = z.object({
  id: z.number(),
  holiday: z.string().min(1, { message: 'Holiday name is required' }),
  message: z.string().min(1, { message: 'Holiday message is required' }),
  date: z.string().min(1, { message: 'Holiday date is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createHolidaySchema = holidaySchema.omit({ id: true });

export const addHolidayAction = actionClient
  .schema(createHolidaySchema)
  .action(async ({ parsedInput: { holiday, message, date, status } }) => {
    try {
      await postHoliday(holiday, message, date, status);
      revalidatePath('/holidays');
      revalidateTag('holidays');
      return { status: 'success', message: 'Holiday added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Holiday',
      };
    }
  });

export const editHolidayAction = actionClient
  .schema(holidaySchema)
  .action(async ({ parsedInput: { id, holiday, message, date, status } }) => {
    try {
      console.log(date);
      await putHoliday(id, holiday, message, date, status);
      revalidatePath('/holidays');
      revalidatePath(`/holidays/${id}`);
      revalidateTag('holidays');
      return {
        status: 'success',
        message: 'Holiday updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Holiday',
      };
    }
  });

const deleteHolidaySchema = z.object({
  id: z.number(),
});

export const removeHolidayAction = actionClient
  .schema(deleteHolidaySchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteHoliday(id);
      revalidatePath('/holidays');
      revalidateTag('holidays');
      return { status: 'success', message: 'Holiday deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Holiday',
      };
    }
  });
