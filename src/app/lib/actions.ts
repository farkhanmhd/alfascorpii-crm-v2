'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import actionClient from '@/lib/safe-action';
import { pekerjaanSchema } from '@/validation';
import { postPekerjaan } from '@/app/lib/data';
import { zfd } from 'zod-form-data';

export type AddPekerjaanState = {
  errors?: {
    pekerjaan?: string[];
    kode?: string[];
  };
  message?: string | null;
};

const schema = zfd.formData(pekerjaanSchema);

export const addNewPekerjaan = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { pekerjaan, kode } }) => {
    try {
      await postPekerjaan({ pekerjaan, kode });
      revalidatePath('/customers/pekerjaan');
    } catch (error) {
      return { message: 'Database Error: Failed to add Pekerjaan' };
    }
  });
