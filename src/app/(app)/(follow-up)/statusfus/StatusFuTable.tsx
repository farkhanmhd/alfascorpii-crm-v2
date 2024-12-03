import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchKeteranganFU } from '@/app/lib/data/statusfus';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const StatusFuTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchKeteranganFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { statusfu, last_page: totalPages, total } = data;
  return (
    <DataTable
        columns={columns}
        data={statusfu}
        rows={total}
        totalPages={totalPages}
        currentPage={Number(page)}
        searchPlaceholder="Search Status FU"
        addLabel="Tambah Status FU"
      />
  );
};

export default StatusFuTable;
