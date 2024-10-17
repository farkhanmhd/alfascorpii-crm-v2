import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchKerabat } from '@/app/lib/data';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
}) => {
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const limit = searchParams?.limit;
  const data = await fetchKerabat(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { kerabat, totalPages } = data;

  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch placeholder="Search staff..." />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={kerabat} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </div>
  );
};
export default Page;
