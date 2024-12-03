import React from 'react';
import { fetchFuResult } from '@/app/lib/data/furesult';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const FuResultTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuResult(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { furesult, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={furesult}
      addLabel="Tambah Hasil FU"
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={total}
      searchPlaceholder="Cari Hasil FU"
    />
  );
};

export default FuResultTable;
