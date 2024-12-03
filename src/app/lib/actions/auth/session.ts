import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ncrypt as Ncrypt } from 'ncrypt-js';

type SessionPayload = {
  userId: string | number;
  name: string;
  username: string;
  status: string;
  avatar: string;
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
  const ncryptObj = new Ncrypt(secretKey as string);
  return ncryptObj.encrypt(token);
};

export const decryptToken = async (encryptedToken: string): Promise<string> => {
  const ncryptObj = new Ncrypt(secretKey as string);
  const decryptedToken = ncryptObj.decrypt(encryptedToken as string);

  return decryptedToken as string;
};

export const storeToken = async (token: string): Promise<void> => {
  const encryptedToken = await encryptToken(token);
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  cookieStore.set('at', encryptedToken, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
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
  status: string,
  avatar: string
) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encryptSession({
    userId,
    name,
    username,
    status,
    expiresAt,
    avatar,
  });

  const cookieStore = await cookies();
  cookieStore.set('sd', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
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
