import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchFuMethod } from '@/app/lib/data/fumethod';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const FuMethodTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuMethod(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { fumethod, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={fumethod} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default FuMethodTable;
