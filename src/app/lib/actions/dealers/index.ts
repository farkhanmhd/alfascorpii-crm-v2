'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { IDealer } from '@/types';
import { getAccessToken } from '../../data/auth';
import { postDealer, putDealer, deleteDealer } from '../../data/dealers';

const dealerSchema = z.object({
  id: z.number(),
  dealer_code: z.string().min(1, { message: 'Dealer code is required' }),
  dealer_name: z.string().min(1, { message: 'Dealer name is required' }),
  dealer_area: z.enum(
    ['Aceh', 'Sumatera Utara', 'Medan', 'Riau', 'Kepulauan Riau'],
    { message: 'Dealer area is required' }
  ),
  dealer_type: z.enum(['MDS', 'Independen', 'Non Independent'], {
    message: 'Dealer type is required',
  }),
});

const createDealerSchema = dealerSchema.omit({ id: true });

export const addDealerAction = actionClient
  .schema(createDealerSchema)
  .action(
    async ({
      parsedInput: { dealer_code, dealer_name, dealer_area, dealer_type },
    }) => {
      try {
        await postDealer(dealer_code, dealer_name, dealer_area, dealer_type);
        revalidatePath('/dealers');
        return { status: 'success', message: 'Dealer added successfully' };
      } catch (error) {
        return {};
      }
    }
  );

export const editDealerAction = actionClient
  .schema(dealerSchema)
  .action(
    async ({
      parsedInput: { id, dealer_code, dealer_name, dealer_area, dealer_type },
    }) => {
      try {
        await putDealer(id, dealer_code, dealer_name, dealer_area, dealer_type);
        revalidatePath('/dealers');
        return { status: 'success', message: 'Dealer updated successfully' };
      } catch (error) {
        return {};
      }
    }
  );

const deleteDealerSchema = z.object({
  id: z.number(),
});

export const removeDealerAction = actionClient
  .schema(deleteDealerSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteDealer(id);
      revalidatePath('/dealers');
      return { status: 'success', message: 'Dealer deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Dealer',
      };
    }
  });

const dealerSearchSchema = z.object({
  search: z.string(),
});

export const getDealerList = actionClient
  .schema(dealerSearchSchema)
  .action(async ({ parsedInput: { search } }) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        `${process.env.BACKEND_URL}/dealers?search=${search}`,
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
      const { dealers } = data;
      const dealerList = dealers.map((dealer: IDealer) => ({
        label: dealer.dealer_name,
        value: dealer.dealer_name,
      }));
      return dealerList;
    } catch (error) {
      return [];
    }
  });
