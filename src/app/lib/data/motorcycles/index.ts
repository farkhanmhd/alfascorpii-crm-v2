import {
  fetchWithParams,
  fetchData,
  deleteData,
} from '@/app/lib/data/fetchUtils';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const fetchMotorcycles = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('motorcycles', search, page, per_page);

export const postProductPreferences = async (motorcycle_type: string) => {
  return fetchData({
    endpoint: 'motorcycles',
    method: 'POST',
    body: { motorcycle_type },
  });
};

export const putProductPreferences = async (
  id: number,
  motorcycle_type: string
) => {
  return fetchData({
    endpoint: `motorcycles/${id}`,
    method: 'PUT',
    body: { motorcycle_type },
  });
};

export const deleteProductPreferences = async (id: number) => {
  return deleteData({
    endpoint: `motorcycles/${id}`,
    method: 'DELETE',
  });
};

export const getAllMotorcyclesList = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(
      `${process.env.API_URL}/motorcycles?per_page=9999`,
      {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data } = await response.json();
    const { motorcycles } = data;
    const motorcycleList = motorcycles.map((motorcycle: any) => ({
      label: motorcycle.motorcycle_type,
      value: String(motorcycle.id),
    }));
    return motorcycleList;
  } catch (error) {
    return [];
  }
};
