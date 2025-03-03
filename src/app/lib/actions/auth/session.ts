'use server';

import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type SessionPayload = {
  userId: string | number;
  name: string;
  username: string;
  status: string;
  expiresAt: Date;
};

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export const encryptSession = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day')
    .sign(key);
};

export const encryptToken = async (token: string): Promise<string> => {
  return new SignJWT({ token })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day')
    .sign(key);
};

export const decryptToken = async (encryptedToken: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(encryptedToken, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const storeToken = async (token: string): Promise<void> => {
  const encryptedToken = await encryptToken(token);
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  cookieStore.set('at', encryptedToken, {
    httpOnly: true,
    expires,
    path: '/',
  });
};

export const decryptSession = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (
  userId: string,
  name: string,
  username: string,
  status: string
) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encryptSession({
    userId,
    name,
    username,
    status,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set('sd', session, {
    httpOnly: true,
    expires: expiresAt,
    path: '/',
  });
};

export const verifySession = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('sd')?.value;
  const session = await decryptSession(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId };
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('sd')?.value;
  const session = await decryptSession(cookie);

  return session;
};

// export const updateSession = async () : Promise<void> | null => {
//   const cookieStore = await cookies();
//   const session = cookieStore.get('sd')?.value;
//   const payload = await decryptSession(session);

//   if (!session || !payload) {
//     return null;
//   }

//   const expires = new Date(Date.now() + 60 * 60 * 1000);
//   cookieStore.set('sd', session, {
//     httpOnly: true,
//     secure: true,
//     expires,
//     sameSite: 'lax',
//     path: '/',
//   });
// };

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('sd');
  cookieStore.delete('at');
};
