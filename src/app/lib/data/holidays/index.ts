import { fetchWithParams, fetchData } from '../fetchUtils';

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
  return fetchData({
    endpoint: `holidays/${id}`,
    method: 'DELETE',
  });
};
