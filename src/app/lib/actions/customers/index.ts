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
  updateFuRecipient,
} from '../../data/customers';

const schema = zfd.formData({
  file: zfd.file(),
});

export const importFollowUpAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      const { message, errors } = await importFollowUp(parsedInput.file);
      revalidatePath('/follow-up');
      revalidatePath('/customers');
      revalidatePath('/duplicatedata');
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
  id: z.string(),
  customer_name: z.string().optional(),
  customer_address: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
  regency_or_city: z.string().optional(),
  postal_code: z.string().optional(),
  telephone: z.string().optional(),
  mobile_phone: z.string().optional(),
  nik: z.string().optional(),
  date_of_birth: z.string().optional(),
  hobby_id: z.number().optional(),
  hobby_description: z.string().optional(),
  amount_of_family: z.number().optional(),
  amount_of_motorcycle: z.number().optional(),
  whatsapp_number: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  email: z.string().optional(),
  income_id: z.number().optional(),
  expense_id: z.number().optional(),
  holiday_id: z.number().optional(),
  house_ownership_id: z.number().optional(),
  job_id: z.number().optional(),
  job_description: z.string().optional(),
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

const recipientSchema = z.object({
  customer_id: z.string().min(1, 'Customer ID tidak boleh kosong'),
  recipient_name: z
    .string()
    .min(1, 'Nama penerima tidak boleh kosong')
    .optional(),
  relation_id: z.string().min(1, 'Hubungan harus dipilih').optional(),
  recipient_address: z.string().min(1, 'Alamat tidak boleh kosong').optional(),
  sub_district: z.string().min(1, 'Kelurahan tidak boleh kosong').optional(),
  house_ownership_id: z
    .number()
    .min(1, 'Status rumah harus dipilih')
    .optional(),
  job_id: z.number().min(1, 'Pekerjaan harus dipilih').optional(),
  recipient_job_detail: z.string().optional(),
  recipient_born_date: z
    .string()
    .min(1, 'Tanggal lahir tidak boleh kosong')
    .optional(),
  recipient_religion: z.string().optional(),
  hobby_id: z.number().optional(),
  recipient_hobby_detail: z.string().optional(),
  amount_of_family: z
    .number()
    .min(1, 'Jumlah keluarga tidak boleh kosong')
    .optional(),
  amount_of_motorcycle: z
    .number()
    .min(0, 'Jumlah motor tidak boleh negatif')
    .optional(),
  whatsapp_number: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional(),
  income_id: z.number().optional(),
  expense_id: z.number().optional(),
  holiday_id: z.number().optional(),
  additional_information: z.string().optional(),
});

export const updateRecipientAction = actionClient
  .schema(recipientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { meta } = await updateFuRecipient(parsedInput);

      if (meta.status === 'success') {
        revalidatePath(`/customers/${parsedInput.customer_id}`);
      }

      return {
        status: meta.status,
        message: meta.message,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to update recipient data',
      };
    }
  });
