'use server';

import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { getUser, getAccessToken } from '../../data/auth';
import { createSession, deleteSession, storeToken } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { username: loginUsername, password } }) => {
    const data = await getUser(loginUsername, password);

    if (!data.user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const { uuid: userId, name, username, status } = data.user;
    const { accessToken } = data;

    await storeToken(accessToken);

    await createSession(userId, name, username, status);

    return {
      status: 'success',
      message: 'Login successful',
      user: { userId, name, username, status },
    };
  });

export const logout = async () => {
  const token = await getAccessToken();
  await fetch(`${process.env.API_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await deleteSession();
};
