import React from 'react';
import { fetchFuResult } from '@/app/lib/data/furesult';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const FuResultTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuResult(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { furesult, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={furesult} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default FuResultTable;
