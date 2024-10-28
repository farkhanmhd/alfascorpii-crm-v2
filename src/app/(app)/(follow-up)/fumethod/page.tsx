import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchMetodeFU } from '@/app/lib/data/fumethod';
import columns from './columns';

const Page = async (props: {
  searchParams?: Promise<{
    page?: string;
    per_page?: string;
    search?: string;
  }>;
}) => {
  const searchParams = await props?.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const per_page = searchParams?.per_page;
  const data = await fetchMetodeFU(search, page, per_page);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { fumethod, last_page: totalPages } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={fumethod} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};
export default Page;
