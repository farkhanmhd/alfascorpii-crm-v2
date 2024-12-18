import React from 'react';
import { fetchDetailFU } from '@/app/lib/data/detailfu';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const FuDetailTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDetailFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { detailfu, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={detailfu} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default FuDetailTable;
