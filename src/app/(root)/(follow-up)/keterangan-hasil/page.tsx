import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchKeteranganHasil } from '@/app/lib/data';
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
  const data = await fetchKeteranganHasil(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { keteranganHasil, totalPages } = data;

  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch placeholder="Search staff..." />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={keteranganHasil} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </div>
  );
};
export default Page;
