'use server';

import { z } from 'zod';
import { postNewDeal } from '@/app/lib/data/customers/deal';
import actionClient from '@/lib/safe-action';
import { zfd } from 'zod-form-data';
import { revalidatePath } from 'next/cache';

const dealSchema = z.object({
  id: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    })
    .optional(),
  deal_type: z
    .string({
      required_error: 'Deal type is required',
      invalid_type_error: 'Deal type must be a string',
    })
    .min(1, 'Deal type must be at least 1 character'),
  call_date: z.string({
    required_error: 'Call date is required',
    invalid_type_error: 'call date must be a string',
  }),
  purchase_date: z
    .string({
      required_error: 'Purchase date is required',
      invalid_type_error: 'Purchase date must be a string',
    })
    .optional(),
  service_date: z
    .string({
      required_error: 'Service date is required',
      invalid_type_error: 'Service date must be a string',
    })
    .optional(),
  relation_id: z
    .number({
      required_error: 'Relation ID is required',
      invalid_type_error: 'Relation ID must be a number',
    })
    .int()
    .min(1, 'Relation ID must be at least 1'),
  deal_customer_name: z
    .string({
      required_error: 'Deal customer name is required',
      invalid_type_error: 'Deal customer name must be a string',
    })
    .min(1, 'Deal customer name must be at least 1 character'),
  deal_customer_nik: z
    .string({
      required_error: 'Deal customer NIK is required',
      invalid_type_error: 'Deal customer NIK must be a string',
    })
    .min(1, 'Deal customer NIK must be at least 1 character'),
  deal_customer_phone: z
    .string({
      required_error: 'Deal customer phone is required',
      invalid_type_error: 'Deal customer phone must be a string',
    })
    .min(1, 'Deal customer phone must be at least 1 character'),
  deal_customer_born_date: z.string({
    required_error: 'Deal customer born date is required',
    invalid_type_error: 'Deal customer born date must be a string',
  }),
  dealer_id: z
    .number({
      required_error: 'Dealer ID is required',
      invalid_type_error: 'Dealer ID must be a number',
    })
    .int()
    .min(1, 'Dealer ID must be at least 1'),
  motorcycle_id: z
    .number({
      required_error: 'Motorcycle ID is required',
      invalid_type_error: 'Motorcycle ID must be a number',
    })
    .int()
    .min(1, 'Motorcycle ID must be at least 1'),
  color_id: z
    .number({
      required_error: 'Color ID is required',
      invalid_type_error: 'Color ID must be a number',
    })
    .int()
    .optional(),
  payment_method: z
    .string({
      required_error: 'Payment method is required',
      invalid_type_error: 'Payment method must be a string',
    })
    .optional(),
  leasing_id: z
    .number({
      required_error: 'Leasing ID is required',
      invalid_type_error: 'Leasing ID must be a number',
    })
    .int()
    .optional(),
  frame_number: z
    .string({
      required_error: 'Frame number is required',
      invalid_type_error: 'Frame number must be a string',
    })
    .min(1, 'Frame number must be at least 1 character'),
  service_type_id: z
    .number({
      required_error: 'Service type ID is required',
      invalid_type_error: 'Service type ID must be a number',
    })
    .int()
    .optional(),
  service_price: z
    .string({
      required_error: 'Service price is required',
      invalid_type_error: 'Service price must be a string',
    })
    .optional(),
  sparepart_price: z
    .string({
      required_error: 'Sparepart price is required',
      invalid_type_error: 'Sparepart price must be a string',
    })
    .optional(),
  deal_status: z.string({
    required_error: 'Deal status is required',
    invalid_type_error: 'Deal status must be a string',
  }),
  additional_info: z.string({
    required_error: 'Additional info is required',
    invalid_type_error: 'Additional info must be a string',
  }),
  file: zfd.file().optional(),
});

export const createNewDealAction = actionClient
  .schema(dealSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { status, message } = await postNewDeal(parsedInput);
      revalidatePath('/deal');
      return { status, message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Deal',
        error,
      };
    }
  });
