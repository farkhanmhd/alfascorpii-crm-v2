import { getAccessToken } from '../auth';
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

export const getExpenseOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${process.env.API_URL}/expenses?per_page=50`,
      {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['expenses'],
        },
      }
    );

    const { data } = await response.json();
    const { expenses } = data;
    const expenseOptions = expenses.map((expense: any) => ({
      label: expense.expense_detail,
      value: String(expense.id),
    }));

    return expenseOptions;
  } catch (error) {
    return [];
  }
};
