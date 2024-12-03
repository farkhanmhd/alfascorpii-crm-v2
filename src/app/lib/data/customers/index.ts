import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';
import { getAccessToken } from '../auth';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);

export const importCustomer = async (file: File) => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.BACKEND_URL}/importdata`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const { message } = await response.json();
  return message;
};

export const getCustomer = async (id: number | string) => {
  return fetchData({
    endpoint: `customers/${id}`,
    method: 'GET',
    cache: 'no-cache',
  });
};
