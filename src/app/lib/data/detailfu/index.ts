import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';

export const fetchDetailFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('detailfu', search, page, per_page);

export const postDetailFu = (
  detail_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'detailfu',
    method: 'POST',
    body: {
      detail_fu_name,
      status,
    },
  });
};

export const putDetailFu = (
  id: number,
  detail_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `detailfu/${id}`,
    method: 'PUT',
    body: {
      status_fu_id: id,
      detail_fu_name,
      status,
    },
  });
};

export const deleteDetailFu = (id: number) => {
  return fetchData({
    endpoint: `detailfu/${id}`,
    method: 'DELETE',
  });
};
