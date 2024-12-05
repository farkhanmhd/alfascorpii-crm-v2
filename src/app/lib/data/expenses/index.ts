import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchExpenses = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('expenses', search, page, per_page);

export const postExpense = (
  expense_upper_limit: string,
  expense_lower_limit: string,
  expense_detail: string,
  expense_code: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: 'expenses',
    method: 'POST',
    body: {
      expense_upper_limit,
      expense_lower_limit,
      expense_detail,
      expense_code,
      status,
    },
  });
};

export const putExpense = (
  id: number,
  expense_upper_limit: string,
  expense_lower_limit: string,
  expense_detail: string,
  expense_code: string,
  status: 'SHOW' | 'HIDE'
) => {
  return fetchData({
    endpoint: `expenses/${id}`,
    method: 'PUT',
    body: {
      expense_upper_limit,
      expense_lower_limit,
      expense_detail,
      expense_code,
      status,
    },
  });
};

export const deleteExpense = (id: number) => {
  return deleteData({
    endpoint: `expenses/${id}`,
  });
};
