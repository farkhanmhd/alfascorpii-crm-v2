import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchLeasing = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('leasing', search, page, per_page);

export const addNewLeasing = (leasing: string) => {
  return fetchData({
    endpoint: 'leasing',
    method: 'POST',
    body: { leasing_name: leasing },
  });
};

export const updateLeasing = (id: number, leasing: string) => {
  return fetchData({
    endpoint: `leasing/${id}`,
    method: 'PUT',
    body: { leasing_name: leasing },
  });
};

export const removeLeasing = (id: number) => {
  return deleteData({
    endpoint: `leasing/${id}`,
  });
};

export const getLeasingOptions = async () => {
  const accessToken = await getAccessToken();
  const url = `${process.env.API_URL}/leasing?per_page=9999`;
  const response = await fetch(url, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data } = await response.json();
  const { leasings } = data;
  const options = leasings.map((option: any) => {
    return {
      label: option.leasing_name,
      value: String(option.id),
    };
  });
  return options;
};
