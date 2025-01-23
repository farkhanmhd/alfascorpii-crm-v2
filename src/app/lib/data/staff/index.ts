import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';

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
