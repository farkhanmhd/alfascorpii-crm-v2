import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getDuplicatedData } from '@/app/lib/data/follow-up';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import { columns } from './columns';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    duplicatedatas,
    last_page: totalPages,
    total,
  } = await getDuplicatedData(search, page, perPage);

  return (
    <>
      <DataTable columns={columns} data={duplicatedatas} rows={total} />
      <DataTablePagination
        currentPage={Number(page)}
        totalPages={totalPages}
        selectedRows={0}
        total={0}
      />
    </>
  );
};

export default CustomerTable;
