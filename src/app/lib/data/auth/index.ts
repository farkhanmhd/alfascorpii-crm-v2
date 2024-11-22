import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { User } from '@/types';
import prisma from '@/prisma';
import { decryptToken } from '../../actions/auth/session';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const accessToken = decryptToken(encryptedToken as string);

  return accessToken;
};

export const getUser = async (
  username: string,
  password: string
): Promise<User | { status: string; message: string } | unknown> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
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
