import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchDegree } from '@/app/lib/data/degrees';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const DegreeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDegree(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { degrees, last_page: totalPages, total } = data;
  return (
    <>
      <DataTable columns={columns} data={degrees} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default DegreeTable;
