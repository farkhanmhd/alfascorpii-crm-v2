'use server';

import { zfd } from 'zod-form-data';
import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { signIn } from '@/auth';

const schema = zfd.formData(loginSchema);

export const loginAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, password } }) => {
    const user = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!user) {
      return { error: { message: 'Invalid credentials' } };
    }

    return { user };
  });
