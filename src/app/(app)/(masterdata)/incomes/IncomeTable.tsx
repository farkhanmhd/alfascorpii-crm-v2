import React from 'react';
import { fetchincome } from '@/app/lib/data/incomes';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const IncomeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchincome(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { incomes, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={incomes}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default IncomeTable;
