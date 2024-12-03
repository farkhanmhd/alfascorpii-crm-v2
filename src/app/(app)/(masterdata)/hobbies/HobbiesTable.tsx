import React from 'react';
import { fetchHobi } from '@/app/lib/data/hobbies';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

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
      totalPages={totalPages}
      rows={total}
      addLabel="Tambah Hobi"
      searchPlaceholder="Cari Hobi"
      currentPage={Number(page)}
    />
  );
};

export default HobbiesTable;
