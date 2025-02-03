'use server';

import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  importFollowUp,
  addFamilyCardNumber,
  updateFamilyMembers,
  updateCustomerData,
} from '../../data/customers';

const schema = zfd.formData({
  file: zfd.file(),
});

export const importFollowUpAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      const { message, errors } = await importFollowUp(parsedInput.file);
      return { status: 'success', message, errors };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to import customers',
      };
    }
  });

const addFamilyCardSchema = z.object({
  id: z.number(),
  family_card_number: z
    .string()
    .min(1, { message: 'Family card number is required' }),
});

export const addFamilyCardAction = actionClient
  .schema(addFamilyCardSchema)
  .action(async ({ parsedInput: { id, family_card_number } }) => {
    const { meta } = await addFamilyCardNumber(id, family_card_number);
    const { status, message } = meta;
    if (status === 'success') {
      revalidatePath(`/customers/${id}`);
    }
    return {
      status,
      message,
    };
  });

const familyMemberSchema = z.object({
  nik: z.string().min(1, { message: 'NIK must be 1 characters' }),
  name: z.string().min(1, { message: 'Name is required' }),
  born_place: z.string().min(1, { message: 'Born place is required' }),
  born_date: z.string().min(1, { message: 'Born date is required' }),
  gender: z.string().min(1, { message: 'Gender Required' }),
  religion: z.string().min(1, { message: 'Religion Required' }),
  occupation: z.string().min(1, { message: 'Occupation Required' }),
  education: z.string().min(1, { message: 'Education Required' }),
  marital_status: z.string().min(1, { message: 'Marital Status Required' }),
  relation_status: z.string().min(1, { message: 'Relation Status Required' }),
});

const familyMembersSchema = z.array(familyMemberSchema);

const familySchema = z.object({
  id: z.string(),
  family_members: familyMembersSchema,
  related_people: familyMembersSchema,
});

export const updateFamilyMembersAction = actionClient
  .schema(familySchema)
  .action(async ({ parsedInput: { id, family_members, related_people } }) => {
    const { meta } = await updateFamilyMembers(
      id,
      family_members,
      related_people
    );
    const { status, message } = meta;
    revalidatePath(`/customers/${id}`);
    return {
      status,
      message,
    };
  });

const updateCustomerSchema = z.object({
  id: z.string().min(1, { message: 'ID must be at least 1 character' }),
  customer_name: z
    .string()
    .min(1, { message: 'Customer name must be at least 1 character' })
    .optional(),
  customer_address: z
    .string()
    .min(1, { message: 'Customer address must be at least 1 character' })
    .optional(),
  province: z
    .string()
    .min(1, { message: 'Province must be at least 1 character' })
    .optional(),
  district: z
    .string()
    .min(1, { message: 'District must be at least 1 character' })
    .optional(),
  sub_district: z
    .string()
    .min(1, { message: 'Sub district must be at least 1 character' })
    .optional(),
  regency_or_city: z
    .string()
    .min(1, { message: 'Regency or city must be at least 1 character' })
    .optional(),
  postal_code: z
    .string()
    .min(1, { message: 'Postal code must be at least 1 character' })
    .optional(),
  telephone: z
    .string()
    .min(1, { message: 'Telephone must be at least 1 character' })
    .optional(),
  mobile_phone: z
    .string()
    .min(1, { message: 'Mobile phone must be at least 1 character' })
    .optional(),
  nik: z
    .string()
    .min(1, { message: 'NIK must be at least 1 character' })
    .optional(),
  dealer_id: z
    .number()
    .int({ message: 'Dealer ID must be an integer' })
    .optional(),
  data_source: z
    .string()
    .min(1, { message: 'Data source must be at least 1 character' })
    .optional(),
  customer_status: z
    .string()
    .min(1, { message: 'Customer status must be at least 1 character' })
    .optional(),
  house_ownership_id: z
    .number()
    .int({ message: 'House ownership ID must be an integer' })
    .optional(),
  job_id: z.number().int({ message: 'Job ID must be an integer' }).optional(),
  job_description: z
    .string()
    .min(1, { message: 'Job description must be at least 1 character' })
    .optional(),
  date_of_birth: z
    .string()
    .min(1, { message: 'Date of birth must be at least 1 character' })
    .optional(),
  religion: z
    .string()
    .min(1, { message: 'Religion must be at least 1 character' })
    .optional(),
  degree_id: z
    .number()
    .int({ message: 'Degree ID must be an integer' })
    .nullable()
    .optional(),
  hobby_id: z
    .number()
    .int({ message: 'Hobby ID must be an integer' })
    .optional(),
  hobby_description: z
    .string()
    .min(1, { message: 'Hobby description must be at least 1 character' })
    .optional(),
  amount_of_family: z
    .number()
    .int({ message: 'Amount of family must be an integer' })
    .optional(),
  family_under_12_yo: z
    .number()
    .int({ message: 'Family under 12 years old must be an integer' })
    .optional(),
  family_12_until_17_yo: z
    .number()
    .int({ message: 'Family 12 until 17 years old must be an integer' })
    .optional(),
  amount_of_motorcycle: z
    .number()
    .int({ message: 'Amount of motorcycle must be an integer' })
    .optional(),
  whatsapp_number: z
    .string()
    .min(1, { message: 'Whatsapp number must be at least 1 character' })
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
});

export const updateCustomerAction = actionClient
  .schema(updateCustomerSchema)
  .action(async ({ parsedInput }) => {
    const json = await updateCustomerData(parsedInput);
    const { meta } = json;
    const { status, message } = meta;
    revalidatePath(`/customers/${parsedInput.id}`);
    return {
      status,
      message,
    };
  });
