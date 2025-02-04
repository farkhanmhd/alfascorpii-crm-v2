import {
  fetchWithParams,
  fetchData,
  deleteData,
} from '@/app/lib/data/fetchUtils';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const fetchDetailFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('detailfu', search, page, per_page);

export const postDetailFu = (
  status_fu_id: string | number,
  detail_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'detailfu',
    method: 'POST',
    body: {
      status_fu_id,
      detail_fu_name,
      status,
    },
  });
};

export const putDetailFu = (
  id: number,
  status_fu_id: string | number,
  detail_fu_name: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `detailfu/${id}`,
    method: 'PUT',
    body: {
      status_fu_id,
      detail_fu_name,
      status,
    },
  });
};

export const deleteDetailFu = (id: number) => {
  return deleteData({
    endpoint: `detailfu/${id}`,
  });
};

export const getFuDetailOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(`${process.env.API_URL}/detailfu`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const {
      data: { detailfu },
    } = await response.json();

    const options = detailfu.map((option: any) => {
      return {
        label: option.detail_fu_name,
        value: String(option.id),
      };
    });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
