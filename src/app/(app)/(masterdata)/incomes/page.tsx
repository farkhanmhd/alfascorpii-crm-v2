import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchincome } from '@/app/lib/data/incomes';
import DataTable from '@/components/fragments/table/DataTable';
import { Metadata } from 'next';
import columns from './columns';

export const metadata: Metadata = {
  title: 'Incomes',
  description: 'List of Income Categories',
};

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
  const perPage = searchParams?.per_page;
  const data = await fetchincome(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { incomes, last_page: totalPages } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={incomes} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};
export default Page;
