import React from 'react';
import { fetchLeasing } from '@/app/lib/data/leasing';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

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
      totalPages={totalPages}
      rows={total}
      addLabel="Tambah Leasing"
      currentPage={Number(page)}
      searchPlaceholder="Cari Leasing"
    />
  );
};

export default LeasingTable;
