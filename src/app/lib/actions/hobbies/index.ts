'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postHobby, putHobby, deleteHobby } from '../../data/hobbies';

const hobbySchema = z.object({
  id: z.number(),
  hobby_name: z.string().min(1, { message: 'Hobby name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createHobbySchema = hobbySchema.omit({ id: true });

export const addHobbyAction = actionClient
  .schema(createHobbySchema)
  .action(async ({ parsedInput: { hobby_name, status } }) => {
    try {
      await postHobby(hobby_name, status);
      revalidatePath('/hobbies');
      return { status: 'success', message: 'Hobby added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Hobby',
      };
    }
  });

export const updateHobbyAction = actionClient
  .schema(hobbySchema)
  .action(async ({ parsedInput: { id, hobby_name, status } }) => {
    try {
      await putHobby(id, hobby_name, status);
      revalidatePath('/hobbies');
      return { status: 'success', message: 'Hobby updated successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Hobby',
      };
    }
  });

const deleteHobbySchema = z.object({
  id: z.number(),
});

export const deleteHobbyAction = actionClient
  .schema(deleteHobbySchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteHobby(id);
      revalidatePath('/hobbies');
      return { status: 'success', message: 'Hobby deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Hobby',
      };
    }
  });
