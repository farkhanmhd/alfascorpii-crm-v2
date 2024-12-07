import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchHoliday } from '@/app/lib/data/holidays';
import columns from './columns';

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

  const { holidays, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={holidays}
      totalPages={totalPages}
      rows={total}
      addLabel="Tambah Hari Besar"
      searchPlaceholder="Cari Hari Besar"
      currentPage={Number(page)}
    />
  );
};

export default HolidayTable;
