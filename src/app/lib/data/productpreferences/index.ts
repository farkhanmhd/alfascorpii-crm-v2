import {
  fetchWithParams,
  fetchData,
  deleteData,
} from '@/app/lib/data/fetchUtils';

export const fetchProductPreferences = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('productpreferences', search, page, per_page);

export const postProductPreferences = async (product_name: string) => {
  return fetchData({
    endpoint: 'productpreferences',
    method: 'POST',
    body: { product_name },
  });
};

export const putProductPreferences = async (
  id: number,
  product_name: string
) => {
  return fetchData({
    endpoint: `productpreferences/${id}`,
    method: 'PUT',
    body: { product_name },
  });
};

export const deleteProductPreferences = async (id: number) => {
  return deleteData({
    endpoint: `productpreferences/${id}`,
    method: 'DELETE',
  });
};
