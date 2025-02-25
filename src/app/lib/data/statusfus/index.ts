import { fetchWithParams, fetchData } from '../fetchUtils';
import { getAccessToken } from '../auth';

export const fetchStatusFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('statusfus', search, page, per_page);

export const getStatusFuOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/statusfus`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['statusfus'],
      },
    });

    const { data } = await response.json();
    const { statusfu } = data;
    const statuses = statusfu
      .filter((status: any) => status.status === 'SHOW')
      .map((status: any) => ({
        label: status.status_fu_name,
        value: String(status.id),
      }));
    return statuses;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postStatusFu = (
  fu_method_id: string,
  status_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'statusfus',
    method: 'POST',
    body: { fu_method_id, status_fu_name, status },
  });
};

export const putStatusFu = (
  id: number,
  fu_method_id: string,
  status_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `statusfus/${id}`,
    method: 'PUT',
    body: { fu_method_id, status_fu_name, status },
  });
};

export const deleteStatusFu = async (id: number) => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/statusfus/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { meta } = await response.json();
    return { meta };
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};
