import { paramsGenerator } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const fetchDeals = async (payload: any) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect('/login');
  }

  const params = paramsGenerator(payload);

  const url = `${process.env.API_URL}/deals?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'appliction/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data } = await response.json();
  const { deals, last_page: lastPage, total, current_page: page } = data;
  return {
    deals,
    lastPage,
    total,
    page,
  };
};

export const getDealById = async (id: string | number) => {
  const accessToken = await getAccessToken();
  const url = `${process.env.API_URL}/deals/${id}`;
  const response = await fetch(url, {
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data } = await response.json();
  const { deal } = data;

  return deal;
};
