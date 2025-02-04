import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

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
  return deleteData({
    endpoint: `incomes/${id}`,
  });
};

export const getIncomeOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(`${process.env.API_URL}/incomes?per_page=50`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = await response.json();
    const { incomes } = data;
    const incomeOptions = incomes.map((income: any) => ({
      label: income.income_detail,
      value: String(income.id),
    }));

    return incomeOptions;
  } catch (error) {
    return [];
  }
};
