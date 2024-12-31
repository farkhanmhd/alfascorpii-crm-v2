import React from 'react';
import { fetchRelation } from '@/app/lib/data/relations';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

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
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default RelationTable;
