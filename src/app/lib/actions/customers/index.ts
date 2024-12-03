'use server';

import { zfd } from 'zod-form-data';
import actionClient from '@/lib/safe-action';
import { importCustomer } from '../../data/customers';

const schema = zfd.formData({
  file: zfd.file(),
});

export const importCustomerAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      const message = await importCustomer(parsedInput.file);
      return { status: 'success', message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to import customers',
      };
    }
  });
