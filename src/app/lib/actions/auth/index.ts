'use server';

import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { User } from '@/types';
import { getUser } from '../../data/auth';
import { createSession, deleteSession } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { username: loginUsername, password } }) => {
    const user = (await getUser(loginUsername, password)) as User;

    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const { id, nip, name, username, role } = user;
    await createSession(id, nip, username, name, role);

    return {
      status: 'success',
      message: 'Login successful',
      user: { id, nip, name, username, role, avatar: '' },
    };
  });

export const logout = async () => {
  await deleteSession();
};
