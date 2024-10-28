import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchLeasing } from '@/app/lib/data/leasing';
import columns from './column';

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
  const data = await fetchLeasing(search, page, per_page);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { leasings, last_page: totalPages } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={leasings} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};
export default Page;
