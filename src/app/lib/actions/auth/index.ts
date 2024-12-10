'use server';

import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { getUser, getAccessToken } from '../../data/auth';
import { deleteSession, storeAccessToken, storeRefreshToken } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { username: loginUsername, password } }) => {
    const data: any = await getUser(loginUsername, password);

    if (!data.user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const { id, name, username, nip, role, status, avatar } = data.user;
    const { accessToken, refreshToken } = data;

    await storeAccessToken(accessToken);
    await storeRefreshToken(refreshToken);
    return {
      status: 'success',
      message: 'Login successful',
      user: { id, name, username, nip, role, status, avatar },
    };
  });

export const logout = async () => {
  const token = await getAccessToken();
  await deleteSession();
  await fetch(`${process.env.BACKEND_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
