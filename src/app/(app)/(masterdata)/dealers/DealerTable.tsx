import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchDealer } from '@/app/lib/data/dealers';
import DataTablePagination from '@/components/fragments/table/pagination';
import { SearchParamsProps } from '@/types';

const DealerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDealer(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { dealers, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={dealers} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default DealerTable;
