// 'use server';

// import { z } from 'zod';
// import { zfd } from 'zod-form-data';
// import { revalidatePath } from 'next/cache';
// import actionClient from '@/lib/safe-action';
// import {
//   putPekerjaan,
//   postPekerjaan,
//   deletePekerjaan,
// } from '@/app/lib/data/customers/pekerjaan';

// export type AddPekerjaanState = {
//   errors?: {
//     pekerjaan?: string[];
//     kode?: string[];
//   };
//   message?: string | null;
// };

// export const addNewPekerjaan = actionClient
//   .action(async ({ parsedInput: { pekerjaan, kode } }) => {
//     try {
//       await postPekerjaan({ pekerjaan, kode });
//       revalidatePath('/customers/pekerjaan');
//       return { message: 'Pekerjaan added successfully' };
//     } catch (error) {
//       return { message: 'Database Error: Failed to add Pekerjaan' };
//     }
//   });

// export const updatePekerjaan = actionClient
//   .schema(pekerjaanSchema)
//   .action(async ({ parsedInput: { id = '', pekerjaan, kode, status } }) => {
//     try {
//       await putPekerjaan(id, pekerjaan, kode, status);
//       revalidatePath('/customers/pekerjaan');
//       return { message: 'Pekerjaan updated successfully' };
//     } catch (error) {
//       return { message: 'Database Error: Failed to update Pekerjaan' };
//     }
//   });

// const deletePekerjaanSchema = z.object({
//   id: z.string(),
// });

// export const removePekerjaan = actionClient
//   .schema(deletePekerjaanSchema)
//   .action(async ({ parsedInput: { id } }) => {
//     try {
//       await deletePekerjaan(id);
//       revalidatePath('/customers/pekerjaan');
//       return { message: 'Pekerjaan deleted successfully' };
//     } catch (error) {
//       return { message: 'Database Error: Failed to delete Pekerjaan' };
//     }
//   });
