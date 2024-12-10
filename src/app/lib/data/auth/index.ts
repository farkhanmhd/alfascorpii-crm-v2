import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';
// import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import db from '@/db';
import { usersTable, refreshTokensTable } from '@/db/schema';
import { createSession, decryptToken } from '../../actions/auth/session';

export type SessionPayload = {
  id: string | number;
  name: string;
  username: string;
  nip: string;
  role: 'Admin' | 'Manager' | 'Leader' | 'CRO' | null;
  status: 'Active' | 'Inactive' | null;
  avatar: string;
  expiresAt: Date;
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const accessToken = decryptToken(encryptedToken as string);

  return accessToken;
};

export const getUser = async (username: string, password: string) => {
  try {
    const user: (typeof usersTable.$inferSelect)[] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (!isValidPassword) {
      return { error: 'Invalid password' };
    }

    const isUserActive = user[0].status === 'Active';

    if (!isUserActive) {
      return { error: 'User is inactive' };
    }

    // const refreshToken: string = randomBytes(32).toString('hex');

    // await db.insert(refreshTokensTable).values({
    //   id: `rt-${uuidv4()}`,
    //   userId: user[0].id,
    //   token: refreshToken,
    //   expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // });

    const avatar = '/avatars/shadcn.jpg';
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const accessToken: string = await createSession({
      id: user[0].id,
      name: user[0].name,
      username: user[0].username,
      nip: user[0].nip,
      role: user[0].role,
      status: user[0].status,
      avatar,
      expiresAt,
    });

    return {
      user: user[0],
      accessToken,
      // refreshToken,
    };
  } catch (error) {
    return error;
  }
};

export const isTokenRevoked = async (
  refreshToken: string
): Promise<boolean> => {
  const tokenRecord = await db
    .select()
    .from(refreshTokensTable)
    .where(eq(refreshTokensTable.token, refreshToken))
    .limit(1); // Limit to a single record

  if (tokenRecord.length === 0) {
    // Token not found, considered revoked
    return true;
  }

  const record = tokenRecord[0];

  // Check if the token is expired
  const currentTimestamp = new Date();
  if (record.expiresAt < currentTimestamp) {
    return true;
  }

  // Token is valid
  return false;
};

export const refreshAccessToken = async (
  encryptedRefreshToken: string,
  payload: SessionPayload
) => {
  try {
    const refreshToken = await decryptToken(encryptedRefreshToken);
    const revokedToken = await isTokenRevoked(refreshToken);

    if (revokedToken) {
      return null;
    }

    const newAccessToken: string = await createSession(payload);

    return newAccessToken;
  } catch (error) {
    return null;
  }
};
