import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchKeteranganFU } from '@/app/lib/data/statusfus';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const StatusFuTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchKeteranganFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { statusfu, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={statusfu} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default StatusFuTable;
