import React from 'react';
import { fetchStaff } from '@/app/lib/data/staff';
import { SearchParamsProps } from '@/types';
import { DataTable } from './table';
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

  return <DataTable columns={columns} data={data} rows={100} />;
};

export default StaffTable;
