import React from 'react';
import { fetchMotorcycles } from '@/app/lib/data/motorcycles';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const MotorcyclesTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchMotorcycles(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { motorcycles, last_page: totalPages, total } = data;

  return (
    <DataTable
      columns={columns}
      data={motorcycles}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default MotorcyclesTable;
