import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchFuResult = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('furesult', search, page, per_page);

export const postFuResult = (
  fu_result_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'furesult',
    method: 'POST',
    body: { fu_result_name, status },
  });
};

export const putFuResult = (
  id: number,
  fu_result_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `furesult/${id}`,
    method: 'PUT',
    body: { fu_result_name, status },
  });
};

export const deleteFuResult = (id: number) => {
  return deleteData({
    endpoint: `furesult/${id}`,
  });
};
