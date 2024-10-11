import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import StaffTable from './StaffTable';
import DataTablePagination from '@/components/fragments/table/pagination';

const Page = async () => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch />
      <Suspense fallback={<div>Loading...</div>}>
        <StaffTable />
      </Suspense>
      <DataTablePagination />
    </div>
  );
};
export default Page;
