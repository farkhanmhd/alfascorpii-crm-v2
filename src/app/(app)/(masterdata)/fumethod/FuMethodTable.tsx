import React from 'react';
import { fetchFuMethod } from '@/app/lib/data/fumethod';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const FuMethodTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuMethod(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { fumethod, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={fumethod}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default FuMethodTable;
