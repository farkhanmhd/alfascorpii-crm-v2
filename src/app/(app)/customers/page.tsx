import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import CustomerTable from './CustomerTable';
import SelectedFilters from './selected-filters';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async () => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-y-4">
      <SelectedFilters />
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default Page;
