import { cookies } from 'next/headers';
import { Permission } from '@/lib/permissions';
import { decryptToken } from '../../actions/auth/session';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const payload = await decryptToken(encryptedToken as string);
  const accessToken = payload?.token;

  return accessToken;
};

export const getUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/login`, {
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

export const getUserPermissions = async (
  userId: string
): Promise<Permission[]> => {
  try {
    const accessToken = await getAccessToken();
    const url = `${process.env.API_URL}/userpermission/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const {
      data: { permissions },
    } = await response.json();

    return permissions;
  } catch (error) {
    return [];
  }
};
