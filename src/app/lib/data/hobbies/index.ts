import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchHobi = (search?: string, page?: string, per_page?: string) =>
  fetchWithParams('hobbies', search, page, per_page);

export const postHobby = (hobby_name: string, status: 'SHOW' | 'HIDE') => {
  return fetchData({
    endpoint: 'hobbies',
    method: 'POST',
    body: { hobby_name, status },
  });
};

export const putHobby = (
  id: number,
  hobby_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `hobbies/${id}`,
    method: 'PUT',
    body: { hobby_name, status },
  });
};

export const deleteHobby = (id: number) => {
  return deleteData({
    endpoint: `hobbies/${id}`,
  });
};
