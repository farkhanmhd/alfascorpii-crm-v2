import React from 'react';
import { fetchStatusFU } from '@/app/lib/data/statusfus';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/elements/table/pagination';
import columns from './columns';

const StatusFuTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchStatusFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { statusfu, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={statusfu} rows={total} />
      <DataTablePagination
        currentPage={Number(page)}
        totalPages={totalPages}
        selectedRows={0}
        total={0}
      />
    </>
  );
};

export default StatusFuTable;
