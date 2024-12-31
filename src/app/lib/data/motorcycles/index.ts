import {
  fetchWithParams,
  fetchData,
  deleteData,
} from '@/app/lib/data/fetchUtils';

export const fetchMotorcycles = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('motorcycles', search, page, per_page);

export const postProductPreferences = async (motorcycle_type: string) => {
  return fetchData({
    endpoint: 'motorcycles',
    method: 'POST',
    body: { motorcycle_type },
  });
};

export const putProductPreferences = async (
  id: number,
  motorcycle_type: string
) => {
  return fetchData({
    endpoint: `motorcycles/${id}`,
    method: 'PUT',
    body: { motorcycle_type },
  });
};

export const deleteProductPreferences = async (id: number) => {
  return deleteData({
    endpoint: `motorcycles/${id}`,
    method: 'DELETE',
  });
};
