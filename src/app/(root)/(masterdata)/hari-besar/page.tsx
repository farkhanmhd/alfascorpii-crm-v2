import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchHariBesar } from '@/app/lib/data';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './column';

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
  const data = await fetchHariBesar(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { hariBesar, totalPages } = data;

  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch placeholder="Search dealer..." />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={hariBesar} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </div>
  );
};
export default Page;
