import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';

export const fetchDealer = async (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('dealers', search, page, per_page);

export const postDealer = (
  dealer_code: string,
  dealer_name: string,
  dealer_area: string,
  dealer_type: string
) => {
  return fetchData({
    endpoint: 'dealers',
    method: 'POST',
    body: {
      dealer_code,
      dealer_name,
      dealer_area,
      dealer_type,
    },
  });
};

export const putDealer = (
  id: number,
  dealer_code: string,
  dealer_name: string,
  dealer_area: string,
  dealer_type: string
) => {
  return fetchData({
    endpoint: `dealers/${id}`,
    method: 'PUT',
    body: {
      dealer_code,
      dealer_name,
      dealer_area,
      dealer_type,
    },
  });
};

export const deleteDealer = (id: number) => {
  return fetchData({
    endpoint: `dealers/${id}`,
    method: 'DELETE',
  });
};
