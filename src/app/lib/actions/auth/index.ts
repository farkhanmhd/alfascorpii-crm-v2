'use server';

import { loginSchema } from '@/validation/schemas';
import actionClient from '@/lib/safe-action';
import { usersTable } from '@/db/schema';
import { getUser } from '../../data/auth';
import { createSession, deleteSession } from './session';

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { username: loginUsername, password } }) => {
    const user = (await getUser(
      loginUsername,
      password
    )) as typeof usersTable.$inferSelect;
    const avatar = '/avatars/shadcn.jpg';

    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const { id, name, username, status, nip, role } = user;

    await createSession(id, name, username, status, nip, role, avatar);

    return {
      status: 'success',
      message: 'Login successful',
      user: { id, name, username, status, avatar },
    };
  });

export const logout = async () => {
  await deleteSession();
};
