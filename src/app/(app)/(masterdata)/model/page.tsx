import React, { Suspense } from 'react';
import DataTablePagination from '@/components/fragments/table/pagination';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchModel } from '@/app/lib/data/model';
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
  const data = await fetchModel(search, page, per_page);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { dpackModel, totalPages, total } = data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          columns={columns}
          data={dpackModel}
          rows={total}
          totalPages={totalPages}
          searchPlaceholder="Search Model"
          currentPage={Number(page)}
          addLabel="Add Model"
        />
      </Suspense>
    </>
  );
};
export default Page;
