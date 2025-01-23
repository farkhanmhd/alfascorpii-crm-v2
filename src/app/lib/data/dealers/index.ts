import {
  fetchWithParams,
  fetchData,
  deleteData,
} from '@/app/lib/data/fetchUtils';

import type { IDealer } from '@/types';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const fetchDealer = async (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('dealers', search, page, per_page);

export const postDealer = (
  dealer_code: string,
  dealer_name: string,
  dealer_area: string,
  dealer_type: string
) => {
  return fetchData({
    endpoint: 'dealers',
    method: 'POST',
    body: {
      dealer_code,
      dealer_name,
      dealer_area,
      dealer_type,
    },
  });
};

export const putDealer = (
  id: number,
  dealer_code: string,
  dealer_name: string,
  dealer_area: string,
  dealer_type: string
) => {
  return fetchData({
    endpoint: `dealers/${id}`,
    method: 'PUT',
    body: {
      dealer_code,
      dealer_name,
      dealer_area,
      dealer_type,
    },
  });
};

export const deleteDealer = (id: number) => {
  return deleteData({
    endpoint: `dealers/${id}`,
  });
};

export const getAllDealersList = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/dealers?per_page=9999`,
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
    const { dealers } = data;
    const dealerList = dealers.map((dealer: IDealer) => ({
      label: dealer.dealer_name,
      value: String(dealer.id),
    }));
    return dealerList;
  } catch (error) {
    return [];
  }
};
