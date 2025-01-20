'use server';

import { loginSchema } from '@/validation/schemas';
import { signIn, signOut } from '@/auth';
import actionClient from '@/lib/safe-action';
import { getAccessToken } from '../../data/auth';
import { deleteSession } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
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

export const logout = async () => {
  const token = await getAccessToken();
  await fetch(`${process.env.BACKEND_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await signOut();
  await deleteSession();
};
