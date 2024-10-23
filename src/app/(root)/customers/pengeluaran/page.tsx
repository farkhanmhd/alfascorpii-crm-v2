import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchPengeluaran } from '@/app/lib/data/customers/pengeluaran';
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
  const data = await fetchPengeluaran(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { pengeluaran, totalPages } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={pengeluaran} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};
export default Page;
