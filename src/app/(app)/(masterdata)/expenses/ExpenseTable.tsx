import React from 'react';
import { fetchExpenses } from '@/app/lib/data/expenses';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const ExpenseTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchExpenses(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { expenses, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={expenses}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default ExpenseTable;
