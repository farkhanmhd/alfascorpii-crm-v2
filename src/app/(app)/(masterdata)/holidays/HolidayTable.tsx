import React from 'react';
import { fetchHoliday } from '@/app/lib/data/holidays';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const HolidayTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchHoliday(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { holidays, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={holidays} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default HolidayTable;
