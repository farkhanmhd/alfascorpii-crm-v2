import React from 'react';
import { fetchRelation } from '@/app/lib/data/relations';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const RelationTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchRelation(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { relations, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={relations}
      addLabel="Tambah Hubungan"
      currentPage={Number(page)}
      totalPages={totalPages}
      rows={total}
      searchPlaceholder="Cari Hubungan"
    />
  );
};

export default RelationTable;
