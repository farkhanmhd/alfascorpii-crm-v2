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

export const getUserData = async () => {
  const accesToken = await getAccessToken();
  const url = `${process.env.API_URL}/user`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`,
    },
    cache: 'force-cache',
  });

  const data = await response.json();
  return data;
};
