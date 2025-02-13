import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { fetchColors } from '@/app/lib/data/colors';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const ColorTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchColors(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { color, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={color}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default ColorTable;
