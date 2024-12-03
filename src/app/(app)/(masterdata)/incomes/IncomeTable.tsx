import React from 'react';
import { fetchincome } from '@/app/lib/data/incomes';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const IncomeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchincome(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { incomes, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={incomes}
      addLabel="Tambah Penghasilan"
      currentPage={Number(page)}
      totalPages={totalPages}
      rows={total}
      searchPlaceholder="Cari Penghasilan"
    />
  );
};

export default IncomeTable;
