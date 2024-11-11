import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchDetailFU } from '@/app/lib/data/detailfu';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const FuDetailTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDetailFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { detailfu, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={detailfu} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default FuDetailTable;
