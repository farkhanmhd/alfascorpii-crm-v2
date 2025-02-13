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
  customer_id: z
    .number()
    .int({ message: 'Customer ID must be an integer' })
    .optional(),
  recipient_name: z.string().optional(),
  relation_id: z.number().optional(),
  whatsapp_number: z.string().optional(),
  additional_information: z.string().optional(),
  follow_up_date: z.string().optional(),
  follow_up_method_id: z.number().optional(),
  follow_up_status_id: z.number().optional(),
  follow_up_detail_id: z.number().optional(),
  follow_up_result_id: z.number().optional(),
  follow_up_note: z.string().optional(),
  product_preferences_id: z.number().optional(),
});

const updateDataSchema = z
  .object({
    recipient_address: z.string().optional(),
    sub_district: z.string().optional(),
    house_ownership_id: z.number().optional(),
    job_id: z.number().optional(),
    recipient_job_detail: z.string().optional(),
    recipient_born_date: z.string().optional(),
    recipient_religion: z.string().optional(),
    hobby_id: z.number().optional(),
    recipient_hobby_detail: z.string().optional(),
    amount_of_family: z.number().optional(),
    amount_of_motorcycle: z.number().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    email: z.string().optional(),
    income_id: z.number().optional(),
    expense_id: z.number().optional(),
    holiday_id: z.number().optional(),
  })
  .optional();

const schema = z.object({
  ...followUpSchema.shape,
  update_data: updateDataSchema,
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
