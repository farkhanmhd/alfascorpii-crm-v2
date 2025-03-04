import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';
import { getAccessToken } from '../auth';

export const fetchStaff = (search?: string, page?: string, per_page?: string) =>
  fetchWithParams('getallusers', search, page, per_page);

export const postNewStaff = (data: { username: string; name: string }) =>
  fetchData({
    endpoint: 'register',
    method: 'POST',
    body: {
      username: data.username,
      name: data.name,
    },
  });

export const getUserData = async (id: string) => {
  const accesToken = await getAccessToken();
  const url = `${process.env.API_URL}/userpermission/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`,
    },
  });

  const { data } = await response.json();
  return data;
};

export const updateUser = async (uuid: string, permissions: string[]) => {
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(`${process.env.API_URL}/updateuserpermission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uuid, permissions }),
    });
    if (!res.ok) {
      throw new Error('Failed to update user permissions');
    }
    const { meta } = await res.json();
    return meta;
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};

export const activateUser = async (uuid: string) => {
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(`${process.env.API_URL}/activateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uuid }),
    });
    if (!res.ok) {
      throw new Error('Failed to activate user');
    }
    const { meta } = await res.json();
    return meta;
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Internal Server Error' };
  }
};

export const deactivateUser = async (uuid: string) => {
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(`${process.env.API_URL}/deactivateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uuid }),
    });
    if (!res.ok) {
      throw new Error('Failed to deactivate user');
    }
    const { meta } = await res.json();
    return meta;
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Internal Server Error' };
  }
};

export const resetUserPassword = async (uuid: string) => {
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(`${process.env.API_URL}/resetuserpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uuid }),
    });
    if (!res.ok) {
      throw new Error('Failed to reset password');
    }
    const { meta } = await res.json();
    return meta;
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Internal Server Error' };
  }
};
