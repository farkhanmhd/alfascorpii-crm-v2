import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchincome } from '@/app/lib/data/incomes';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const IncomeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchincome(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { incomes, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={incomes} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default IncomeTable;
