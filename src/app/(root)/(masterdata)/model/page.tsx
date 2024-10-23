import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchModel } from '@/app/lib/data/model';
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
  const data = await fetchModel(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { dpackModel, totalPages } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={dpackModel} includeIndex />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};
export default Page;
