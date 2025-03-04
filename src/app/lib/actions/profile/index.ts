'use server';

import { z } from 'zod';
import actionClient from '@/lib/safe-action';
import { changePassword } from '../../data/profile';

const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, { message: 'Current password is required' }),
    new_password: z.string().min(1, { message: 'New password is required' }),
    confirm_password: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export const changePasswordAction = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { old_password, new_password } }) => {
    try {
      const { meta } = await changePassword(old_password, new_password);
      const { status, message } = meta;
      return { status, message };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to change password',
      };
    }
  });
