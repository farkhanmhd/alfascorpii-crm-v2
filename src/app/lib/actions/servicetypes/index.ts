'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import {
  putServiceType,
  postServiceType,
  deleteServiceType,
} from '@/app/lib/data/servicetypes';

const serviceTypeSchema = z.object({
  id: z.number(),
  service_name: z.string().min(1, { message: 'Tipe service harus diisi' }),
});

const createServiceTypeSchema = serviceTypeSchema.omit({ id: true });

export const addServiceTypeAction = actionClient
  .schema(createServiceTypeSchema)
  .action(async ({ parsedInput: { service_name } }) => {
    try {
      await postServiceType(service_name);
      revalidatePath('/servicetypes');
      revalidateTag('servicetypes');
      return {
        status: 'success',
        message: 'Tipe service berhasil ditambahkan',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Gagal menambahkan tipe service',
      };
    }
  });

export const editServiceTypeAction = actionClient
  .schema(serviceTypeSchema)
  .action(async ({ parsedInput: { id, service_name } }) => {
    try {
      await putServiceType(id, service_name);
      revalidatePath('/servicetypes');
      revalidatePath(`/servicetypes/${id}`);
      revalidateTag('servicetypes');
      return {
        status: 'success',
        message: 'Tipe service berhasil diperbarui',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Gagal memperbarui tipe service',
      };
    }
  });

const deleteServiceTypeSchema = z.object({
  id: z.number(),
});

export const removeServiceTypeAction = actionClient
  .schema(deleteServiceTypeSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteServiceType(id);
      revalidatePath('/servicetypes');
      revalidateTag('servicetypes');
      return { status: 'success', message: 'Tipe service berhasil dihapus' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Gagal menghapus tipe service',
      };
    }
  });
