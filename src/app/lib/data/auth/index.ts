import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { usersTable } from '@/db/schema';
import { decryptToken } from '../../actions/auth/session';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const accessToken = decryptToken(encryptedToken as string);

  return accessToken;
};

export const getUser = async (username: string, password: string) => {
  try {
    const user = (
      await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
    ).at(0) as typeof usersTable.$inferSelect;

    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return null;
    }
    return user;
  } catch (error) {
    return error;
  }
};
