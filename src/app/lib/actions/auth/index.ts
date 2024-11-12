'use server';

import { getUser } from '../../auth';
import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { createSession, deleteSession, encryptToken } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { username: loginUsername, password } }) => {
    const data = await getUser(loginUsername, password);

    if (!data.user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const { uuid: userId, name, username, status } = data.user;
    const { accessToken } = data;

    await encryptToken(accessToken);

    await createSession(userId, name, username, status);

    return {
      status: 'success',
      message: 'Login successful',
      user: { userId, name, username, status, avatar: '' },
    };
  });

export const logout = async () => {
  await deleteSession();
};
