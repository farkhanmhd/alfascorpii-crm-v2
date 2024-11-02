import { fetchWithParams, fetchData } from '../fetchUtils';

export const fetchincome = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('incomes', search, page, per_page);

export const postIncome = (
  income_upper_limit: string,
  income_lower_limit: string,
  income_detail: string,
  income_code: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'incomes',
    method: 'POST',
    body: {
      income_upper_limit,
      income_lower_limit,
      income_detail,
      income_code,
      status,
    },
  });
};

export const putIncome = (
  id: number,
  income_upper_limit: string,
  income_lower_limit: string,
  income_detail: string,
  income_code: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `incomes/${id}`,
    method: 'PUT',
    body: {
      income_upper_limit,
      income_lower_limit,
      income_detail,
      income_code,
      status,
    },
  });
};

export const deleteIncome = (id: number) => {
  return fetchData({
    endpoint: `incomes/${id}`,
    method: 'DELETE',
  });
};
