import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import StaffTable from './StaffTable';

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {
  const search = searchParams?.search || '';
  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch placeholder="Search staff..." />
      <Suspense fallback={<div>Loading...</div>}>
        <StaffTable search={search} />
      </Suspense>
      <DataTablePagination />
    </div>
  );
};
export default Page;
