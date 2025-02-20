'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';

import { getAccessToken } from '../../data/auth';
import {
  postProductPreferences,
  putProductPreferences,
  deleteProductPreferences,
} from '../../data/motorcycles';

const addProductPreferencesSchema = z.object({
  id: z.number(),
  product_name: z.string().min(1, { message: 'Product name is required' }),
});

const createProductPreferencesSchema = addProductPreferencesSchema.omit({
  id: true,
});

export const addMotorcycleAction = actionClient
  .schema(createProductPreferencesSchema)
  .action(async ({ parsedInput: { product_name } }) => {
    try {
      await postProductPreferences(product_name);
      revalidatePath('/motorcycles');
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

export const updateMotorcycleAction = actionClient
  .schema(addProductPreferencesSchema)
  .action(async ({ parsedInput: { id, product_name } }) => {
    try {
      await putProductPreferences(id, product_name);
      revalidatePath('/motorcycles');
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

export const deleteMotorcycleAction = actionClient
  .schema(deleteProductPreferencesSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteProductPreferences(id);
      revalidatePath('/motorcycles');
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

const motorcycleSearchSchema = z.object({
  search: z.string(),
});

export const getMotorcycleList = actionClient
  .schema(motorcycleSearchSchema)
  .action(async ({ parsedInput: { search } }) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(
        `${process.env.API_URL}/motorcycles?search=${search}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = await response.json();
      const { motorcycles } = data;
      const motorcycleList = motorcycles.map((motorcycle: any) => ({
        label: motorcycle.motorcycle_type,
        value: String(motorcycle.id),
      }));
      return motorcycleList;
    } catch (error) {
      return [];
    }
  });
