import React from 'react';
import { fetchLeasing } from '@/app/lib/data/leasing';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const LeasingTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchLeasing(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { leasings, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={leasings}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default LeasingTable;
