import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';
import { getAccessToken } from '../auth';

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

export const getFuMethodOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/fumethod`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['fumethod'],
      },
    });

    const {
      data: { fumethod },
    } = await response.json();

    const options = fumethod
      .filter((method: any) => method.status === 'SHOW')
      .map((option: any) => {
        return {
          label: option.fu_method_name,
          value: String(option.id),
        };
      });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
