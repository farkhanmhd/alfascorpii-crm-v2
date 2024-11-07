'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  postProductPreferences,
  putProductPreferences,
  deleteProductPreferences,
} from '../../data/productpreferences';

const addProductPreferencesSchema = z.object({
  id: z.number(),
  product_name: z.string().min(1, { message: 'Product name is required' }),
});

const createProductPreferencesSchema = addProductPreferencesSchema.omit({
  id: true,
});

export const addProductPreferencesAction = actionClient
  .schema(createProductPreferencesSchema)
  .action(async ({ parsedInput: { product_name } }) => {
    try {
      await postProductPreferences(product_name);
      revalidatePath('/productpreferences');
      return {
        status: 'success',
        message: 'Product Preferences added successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Product Preferences',
      };
    }
  });

export const updateProductPreferencesAction = actionClient
  .schema(addProductPreferencesSchema)
  .action(async ({ parsedInput: { id, product_name } }) => {
    try {
      await putProductPreferences(id, product_name);
      revalidatePath('/productpreferences');
      return {
        status: 'success',
        message: 'Product Preferences updated successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to update Product Preferences',
      };
    }
  });

const deleteProductPreferencesSchema = z.object({
  id: z.number(),
});

export const deleteProductPreferencesAction = actionClient
  .schema(deleteProductPreferencesSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteProductPreferences(id);
      revalidatePath('/productpreferences');
      return {
        status: 'success',
        message: 'Product Preferences deleted successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Product Preferences',
      };
    }
  });
