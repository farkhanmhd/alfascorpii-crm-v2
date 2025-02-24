import { getAccessToken } from '../auth';
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

export const getHobbyOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/hobbies?per_page=50`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['hobbies'],
      },
    });

    const { data } = await response.json();
    const { hobbies } = data;
    const hobbyOptions = hobbies.map((hobby: any) => ({
      label: hobby.hobby_name,
      value: String(hobby.id),
    }));

    return hobbyOptions;
  } catch (error) {
    return [];
  }
};
