import React from 'react';
import { fetchDealer } from '@/app/lib/data/dealers';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const DealerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDealer(search, page, perPage);

  const { dealers, last_page: totalPages, total } = data;

  return (
    <>
      <DataTable columns={columns} data={dealers} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default DealerTable;
