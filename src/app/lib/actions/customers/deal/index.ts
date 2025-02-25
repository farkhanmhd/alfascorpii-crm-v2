'use server';

import { z } from 'zod';
import {
  postNewDeal,
  importDealImage,
  updateDealStatus,
} from '@/app/lib/data/customers/deal';
import actionClient from '@/lib/safe-action';
import { zfd } from 'zod-form-data';
import { revalidatePath } from 'next/cache';

const dealSchema = z.object({
  id: z.string().optional(), // ok
  deal_type: z.string().min(1, { message: 'Tipe Deal tidak boleh kosong' }),
  call_date: z.string().min(1), // ok
  purchase_date: z.string().optional(), // ok
  service_date: z.string().optional(),
  relation_id: z.number().optional(),
  deal_customer_name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  deal_customer_nik: z.string().min(1, { message: 'NIK tidak boleh kosong' }),
  deal_customer_phone: z
    .string()
    .min(1, { message: 'Nomor HP tidak boleh kosong' }),
  deal_customer_born_date: z.string(),
  dealer_id: z.number().optional(),
  motorcycle_id: z.number().optional(),
  color_id: z.number().optional(),
  payment_method: z.string().optional(),
  leasing_id: z
    .number()
    .min(1, { message: 'Leasing tidak boleh kosong' })
    .optional(),
  frame_number: z.string().optional(),
  service_type_id: z.number().optional(),
  service_price: z.string().optional(),
  sparepart_price: z.string().optional(),
  deal_status: z
    .string()
    .min(1, { message: 'Hasil Deal Tidak Boleh Kosong' })
    .optional(),
  additional_info: z.string().optional(),
  file: zfd.file().optional(),
});

export const createNewDealAction = actionClient
  .schema(dealSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { status, message } = await postNewDeal(parsedInput);
      revalidatePath('/deal');
      revalidatePath(`/customers/${parsedInput.id}`);
      return { status, message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Deal',
        error,
      };
    }
  });

const importImageSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  }),
  file: zfd.file().optional(),
});

export const importDealImageAction = actionClient
  .schema(importImageSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { status, message } = await importDealImage(
        parsedInput.id,
        parsedInput.file
      );
      revalidatePath(`/deal/${parsedInput.id}`);
      return { status, message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Deal',
        error,
      };
    }
  });

const updateDealSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  }),
  deal_status: z.string({ invalid_type_error: 'Status must be a string' }),
});

export const updateDealStatusAction = actionClient
  .schema(updateDealSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { status, message } = await updateDealStatus(parsedInput.id, {
        deal_status: parsedInput.deal_status,
      });
      revalidatePath(`/deal/${parsedInput.id}`);
      return { status, message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Deal',
        error,
      };
    }
  });
