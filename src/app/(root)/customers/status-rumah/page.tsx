import React, { Suspense } from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchStatusRumah } from '@/app/lib/data';
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
  const data = await fetchStatusRumah(search, page, limit);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { statusRumah, totalPages } = data;

  return (
    <div className="flex h-full flex-1 flex-col">
      <TableContainerHeader
        placeholder="Search status rumah..."
        buttonPlaceHolder="Add Status Rumah"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={statusRumah} includeIndex />
      </Suspense>
    </div>
  );
};
export default Page;
