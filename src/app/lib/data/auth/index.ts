import { cookies } from 'next/headers';
import { decryptToken } from '../../actions/auth/session';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const accessToken = decryptToken(encryptedToken as string);

  return accessToken;
};

export const getUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const { data: user } = await response.json();
    return user;
  } catch (error) {
    return error;
  }
};
