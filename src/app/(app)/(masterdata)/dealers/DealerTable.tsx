import React from 'react';
import { fetchDealer } from '@/app/lib/data/dealers';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const DealerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDealer(search, page, perPage);

  const { dealers, last_page: totalPages, total } = data;

  return (
    <DataTable
      columns={columns}
      data={dealers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default DealerTable;
