import React from 'react';
import { fetchStaff } from '@/app/lib/data/staff';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
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

  const { staffs, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={staffs} rows={total} />
      <DataTablePagination
        currentPage={Number(page)}
        totalPages={totalPages}
        selectedRows={0}
        total={0}
      />
    </>
  );
};

export default StaffTable;
