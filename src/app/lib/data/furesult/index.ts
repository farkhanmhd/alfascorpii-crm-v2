import { getAccessToken } from '../auth';
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
  id: string,
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

export const getFuResultOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/furesult`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['furesult'],
      },
    });

    const {
      data: { furesult },
    } = await response.json();

    const options = furesult.map((option: any) => {
      return {
        label: option.fu_result_name,
        value: String(option.id),
      };
    });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
