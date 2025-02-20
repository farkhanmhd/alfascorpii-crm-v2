import React from 'react';
import { fetchExpenses } from '@/app/lib/data/expenses';
import { SearchParamsProps } from '@/types';
import ExpenseTableWrapper from './ExpenseTableWrapper';

const ExpenseTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchExpenses(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <ExpenseTableWrapper data={data} page={page!} />;
};

export default ExpenseTable;
