import { fetchWithParams, fetchData } from '../fetchUtils';

export const fetchHouseOwnerships = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('houseownerships', search, page, per_page);

export const postHouseOwnership = (
  house_ownership_status: string,
  status: string
) => {
  return fetchData({
    endpoint: 'houseownerships',
    method: 'POST',
    body: { house_ownership_status, status },
  });
};

export const putHouseOwnership = (
  id: number,
  house_ownership_status: string,
  status: string
) => {
  return fetchData({
    endpoint: `houseownerships/${id}`,
    method: 'PUT',
    body: { house_ownership_status, status },
  });
};

export const deleteHouseOwnership = (id: number) => {
  return fetchData({
    endpoint: `houseownerships/${id}`,
    method: 'DELETE',
  });
};
