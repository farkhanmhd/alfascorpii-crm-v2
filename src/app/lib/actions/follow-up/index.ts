'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  randomAssignFollowUp,
  manualAssignFollowUp,
  addFollowUp,
} from '../../data/follow-up';

const randomAssignSchema = z.object({
  amount: z
    .number()
    .min(1, { message: 'Amount is required and greater than 0' }),
  user_id: z.string().min(1, { message: 'User ID is required' }),
});

export const randomAssignFollowUpAction = actionClient
  .schema(randomAssignSchema)
  .action(async ({ parsedInput: { amount, user_id } }) => {
    try {
      const meta: { status: string; message: string } =
        await randomAssignFollowUp({ amount, user_id });
      revalidatePath('/follow-up');
      revalidatePath('/customers');
      return { status: meta.status, message: meta.message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to assign Follow-up',
        error,
      };
    }
  });

const manualAssignSchema = z.object({
  customerIds: z
    .array(z.number().min(1, { message: 'Customer ID should be a number' }))
    .min(1, { message: 'At least one customer ID is required' }),
  user_id: z.string().min(1, { message: 'User ID is required' }),
});

export const manualAssignFollowUpAction = actionClient
  .schema(manualAssignSchema)
  .action(async ({ parsedInput: { customerIds, user_id } }) => {
    try {
      const meta: { status: string; message: string } =
        await manualAssignFollowUp({ customerIds, user_id });
      revalidatePath('/follow-up');
      revalidatePath('/customers');
      return { status: meta.status, message: meta.message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to assign Follow-up',
        error,
      };
    }
  });

const followUpSchema = z.object({
  customer_id: z.number(),
  recipient_name: z.string(),
  relation_id: z.number(),
  whatsapp_number: z.string(),
  additional_information: z.string(),
  follow_up_date: z.string(),
  follow_up_method_id: z.number(),
  follow_up_status_id: z.number(),
  follow_up_detail_id: z.number(),
  follow_up_result_id: z.number(),
  follow_up_note: z.string(),
  product_preferences_id: z.number(),
});

const updateDataSchema = z.object({
  recipient_address: z.string(),
  sub_district: z.string(),
  house_ownership_id: z.number(),
  job_id: z.number(),
  recipient_job_detail: z.string(),
  recipient_born_date: z.string(),
  recipient_religion: z.string(),
  hobby_id: z.number(),
  recipient_hobby_detail: z.string(),
  amount_of_family: z.number(),
  amount_of_motorcycle: z.number(),
  facebook: z.string(),
  instagram: z.string(),
  email: z.string(),
  income_id: z.number(),
  expense_id: z.number(),
  holiday_id: z.number(),
});

const schema = z.object({
  ...followUpSchema.shape,
  update_data: updateDataSchema.optional(),
});

export const addFollowUpAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      const meta: { status: string; message: string } =
        await addFollowUp(parsedInput);

      revalidatePath('/follow-up');
      return { status: meta.status, message: meta.message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to add Follow-up',
        error,
      };
    }
  });
