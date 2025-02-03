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
  customer_id: z.number().int({ message: 'Customer ID must be an integer' }),
  recipient_name: z
    .string()
    .min(1, { message: 'Recipient name must be at least 1 character' }),
  relation_id: z.number().int({ message: 'Relation ID must be an integer' }),
  whatsapp_number: z
    .string()
    .min(1, { message: 'Whatsapp number must be at least 1 character' }),
  additional_information: z
    .string()
    .min(1, { message: 'Additional information must be at least 1 character' }),
  follow_up_date: z
    .string()
    .min(1, { message: 'Follow up date must be at least 1 character' }),
  follow_up_method_id: z
    .number()
    .int({ message: 'Follow up method ID must be an integer' }),
  follow_up_status_id: z
    .number()
    .int({ message: 'Follow up status ID must be an integer' }),
  follow_up_detail_id: z
    .number()
    .int({ message: 'Follow up detail ID must be an integer' }),
  follow_up_result_id: z
    .number()
    .int({ message: 'Follow up result ID must be an integer' }),
  follow_up_note: z
    .string()
    .min(1, { message: 'Follow up note must be at least 1 character' }),
  product_preferences_id: z
    .number()
    .int({ message: 'Product preferences ID must be an integer' }),
});

const updateDataSchema = z
  .object({
    recipient_address: z
      .string()
      .min(1, { message: 'Recipient address must be at least 1 character' })
      .optional(),
    sub_district: z
      .string()
      .min(1, { message: 'Sub district must be at least 1 character' })
      .optional(),
    house_ownership_id: z
      .number()
      .int({ message: 'House ownership ID must be an integer' })
      .optional(),
    job_id: z.number().int({ message: 'Job ID must be an integer' }).optional(),
    recipient_job_detail: z
      .string()
      .min(1, { message: 'Recipient job detail must be at least 1 character' })
      .optional(),
    recipient_born_date: z
      .string()
      .min(1, { message: 'Recipient born date must be at least 1 character' })
      .optional(),
    recipient_religion: z
      .string()
      .min(1, { message: 'Recipient religion must be at least 1 character' })
      .optional(),
    hobby_id: z
      .number()
      .int({ message: 'Hobby ID must be an integer' })
      .optional(),
    recipient_hobby_detail: z
      .string()
      .min(1, {
        message: 'Recipient hobby detail must be at least 1 character',
      })
      .optional(),
    amount_of_family: z
      .number()
      .int({ message: 'Amount of family must be an integer' })
      .optional(),
    amount_of_motorcycle: z
      .number()
      .int({ message: 'Amount of motorcycle must be an integer' })
      .optional(),
    facebook: z
      .string()
      .min(1, { message: 'Facebook must be at least 1 character' })
      .optional(),
    instagram: z
      .string()
      .min(1, { message: 'Instagram must be at least 1 character' })
      .optional(),
    email: z
      .string()
      .min(1, { message: 'Email must be at least 1 character' })
      .optional(),
    income_id: z
      .number()
      .int({ message: 'Income ID must be an integer' })
      .optional(),
    expense_id: z
      .number()
      .int({ message: 'Expense ID must be an integer' })
      .optional(),
    holiday_id: z
      .number()
      .int({ message: 'Holiday ID must be an integer' })
      .optional(),
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
