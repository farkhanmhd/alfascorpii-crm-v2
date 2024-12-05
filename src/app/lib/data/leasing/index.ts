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
