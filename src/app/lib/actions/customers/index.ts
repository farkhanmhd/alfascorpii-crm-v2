'use server';

import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  importFollowUp,
  addFamilyCardNumber,
  updateFamilyMembers,
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
