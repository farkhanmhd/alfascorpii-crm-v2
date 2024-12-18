import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getFollowUps } from '@/app/lib/data/follow-up';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import { columns } from './columns';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    followupqueues,
    last_page: totalPages,
    total,
  } = await getFollowUps(search, page, perPage);

  return (
    <>
      <DataTable columns={columns} data={followupqueues} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default CustomerTable;
