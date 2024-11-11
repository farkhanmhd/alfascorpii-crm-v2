import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchHoliday } from '@/app/lib/data/holidays';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const HolidayTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchHoliday(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { holidays, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={holidays} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default HolidayTable;
