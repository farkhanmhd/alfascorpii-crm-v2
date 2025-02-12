import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchHoliday = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('holidays', search, page, per_page);

export const postHoliday = (
  holiday: string,
  message: string,
  date: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'holidays',
    method: 'POST',
    body: { holiday_name: holiday, message, holiday_date: date, status },
  });
};

export const putHoliday = (
  id: number,
  holiday: string,
  message: string,
  date: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `holidays/${id}`,
    method: 'PUT',
    body: { holiday_name: holiday, message, holiday_date: date, status },
  });
};

export const deleteHoliday = (id: number) => {
  return deleteData({
    endpoint: `holidays/${id}`,
  });
};

export const getHolidayOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) redirect('/login');

    const response = await fetch(`${process.env.API_URL}/holidays`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const {
      data: { holidays },
    } = await response.json();

    const options = holidays.map((option: any) => {
      return {
        label: option.holiday_name,
        value: String(option.id),
      };
    });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
