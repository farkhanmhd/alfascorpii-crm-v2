'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { pekerjaanSchema } from '@/validation';
import { postPekerjaan, putPekerjaan, deletePekerjaan } from '@/app/lib/data';
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

export const updatePekerjaan = actionClient
  .schema(pekerjaanSchema)
  .action(async ({ parsedInput: { id = '', pekerjaan, kode, status } }) => {
    try {
      await putPekerjaan(id, pekerjaan, kode, status);
      revalidatePath('/customers/pekerjaan');
    } catch (error) {
      return { message: 'Database Error: Failed to update Pekerjaan' };
    }
  });

const deletePekerjaanSchema = z.object({
  id: z.string(),
});

export const removePekerjaan = actionClient
  .schema(deletePekerjaanSchema)
  .action(async ({ parsedInput: { id = '' } }) => {
    console.log(id);
    try {
      await deletePekerjaan(id);
      revalidatePath('/customers/pekerjaan');
    } catch (error) {
      return { message: 'Database Error: Failed to delete Pekerjaan' };
    }
  });
