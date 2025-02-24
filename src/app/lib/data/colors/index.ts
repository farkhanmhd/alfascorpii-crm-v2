import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchColors = (
  search?: string,
  page?: string,
  per_page?: string
) => {
  return fetchWithParams('colors', search, page, per_page);
};

export const postColor = async (color_name: string) => {
  return fetchData({
    endpoint: 'colors',
    method: 'POST',
    body: { color_name },
  });
};

export const putColor = async (id: string | number, color_name: string) => {
  return fetchData({
    endpoint: `colors/${id}`,
    method: 'PUT',
    body: { color_name },
  });
};

export const deleteColor = async (id: number) => {
  return deleteData({
    endpoint: `colors/${id}`,
  });
};

export const getColorOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/colors`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ['colors'] },
    });

    const {
      data: { color },
    } = await response.json();

    const options = color.map((option: any) => {
      return {
        label: option.color_name,
        value: String(option.id),
      };
    });

    options.unshift({
      label: 'Semua',
      value: 'all',
    });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
