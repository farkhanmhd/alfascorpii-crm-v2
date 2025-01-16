import React from 'react';
import { fetchHobi } from '@/app/lib/data/hobbies';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const HobbiesTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchHobi(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { hobbies, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={hobbies}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default HobbiesTable;
