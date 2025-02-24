'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  postRelation,
  putRelation,
  deleteRelation,
} from '../../data/relations';

const relationSchema = z.object({
  id: z.number(),
  relation: z.string().min(1, { message: 'Relation name is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createRelationSchema = relationSchema.omit({ id: true });

export const addRelationAction = actionClient
  .schema(createRelationSchema)
  .action(async ({ parsedInput: { relation, status } }) => {
    try {
      await postRelation(relation, status);
      revalidatePath('/relations');
      revalidateTag('relations');
      return { status: 'success', message: 'Relation added successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Relation',
      };
    }
  });

export const editRelationAction = actionClient
  .schema(relationSchema)
  .action(async ({ parsedInput: { id, relation, status } }) => {
    try {
      await putRelation(id, relation, status);
      revalidatePath('/relations');
      revalidatePath(`/relations/${id}`);
      revalidateTag('relations');
      return {
        status: 'success',
        message: 'Relation updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Relation',
      };
    }
  });

const deleteRelationSchema = z.object({
  id: z.number(),
});

export const removeRelationAction = actionClient
  .schema(deleteRelationSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteRelation(id);
      revalidatePath('/relations');
      revalidateTag('relations');
      return { status: 'success', message: 'Relation deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Relation',
      };
    }
  });
