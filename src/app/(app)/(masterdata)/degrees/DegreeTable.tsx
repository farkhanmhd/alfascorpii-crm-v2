import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchDegree } from '@/app/lib/data/degrees';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const DegreeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDegree(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { dealers, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={dealers} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default DegreeTable;
