import React from 'react';
import { fetchStaff } from '@/app/lib/data/staff';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/elements/table/pagination';
import columns from './columns';

const StaffTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchStaff(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return (
    <>
      <DataTable columns={columns} data={data} rows={100} />
      <DataTablePagination
        currentPage={Number(page)}
        totalPages={1}
        selectedRows={0}
        total={0}
      />
    </>
  );
};

export default StaffTable;
