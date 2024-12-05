import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchFuMethod = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('fumethod', search, page, per_page);

export const postFuMethod = (
  fu_method_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'fumethod',
    method: 'POST',
    body: { fu_method_name, status },
  });
};

export const putFuMethod = (
  id: number,
  fu_method_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `fumethod/${id}`,
    method: 'PUT',
    body: { fu_method_name, status },
  });
};

export const deleteFuMethod = (id: number) => {
  return deleteData({
    endpoint: `fumethod/${id}`,
  });
};
