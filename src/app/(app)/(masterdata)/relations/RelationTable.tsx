import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchRelation } from '@/app/lib/data/relations';
import DataTablePagination from '@/components/fragments/table/pagination';
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

  const { relations, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={relations} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default RelationTable;
