'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  postHouseOwnership,
  putHouseOwnership,
  deleteHouseOwnership,
} from '../../data/houseownerships';

const houseOwnershipSchema = z.object({
  id: z.number(),
  house_ownership_status: z
    .string()
    .min(1, { message: 'House ownership status is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createHouseOwnershipSchema = houseOwnershipSchema.omit({ id: true });

export const addHouseOwnershipAction = actionClient
  .schema(createHouseOwnershipSchema)
  .action(async ({ parsedInput: { house_ownership_status, status } }) => {
    try {
      await postHouseOwnership(house_ownership_status, status);
      revalidatePath('/houseownerships');
      revalidateTag('houseownerships');
      return {
        status: 'success',
        message: 'House ownership added successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add House Ownership',
      };
    }
  });

export const editHouseOwnershipAction = actionClient
  .schema(houseOwnershipSchema)
  .action(async ({ parsedInput: { id, house_ownership_status, status } }) => {
    try {
      await putHouseOwnership(id, house_ownership_status, status);
      revalidatePath('/houseownerships');
      revalidatePath(`/houseownerships/${id}`);
      revalidateTag('houseownerships');
      return {
        status: 'success',
        message: 'House ownership updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update House Ownership',
      };
    }
  });

const deleteHouseOwnershipSchema = z.object({
  id: z.number(),
});

export const removeHouseOwnershipAction = actionClient
  .schema(deleteHouseOwnershipSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteHouseOwnership(id);
      revalidatePath('/houseownerships');
      revalidateTag('houseownerships');
      return {
        status: 'success',
        message: 'House ownership deleted successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete House Ownership',
      };
    }
  });
