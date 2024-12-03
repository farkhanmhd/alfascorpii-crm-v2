import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchExpenses } from '@/app/lib/data/expenses';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

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
      totalPages={totalPages}
      rows={total}
      addLabel="Tambah Pengeluaran"
      searchPlaceholder="Cari Pengeluaran"
      currentPage={Number(page)}
    />
  );
};

export default ExpenseTable;
