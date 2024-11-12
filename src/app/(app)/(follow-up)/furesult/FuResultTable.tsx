import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchFuResult } from '@/app/lib/data/furesult';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const FuResultTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuResult(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { furesult, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={furesult} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default FuResultTable;
