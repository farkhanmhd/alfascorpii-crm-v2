import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import AddButton from '@/components/fragments/buttons/AddButton';
import Tablesearch from '@/components/fragments/table/tablesearch';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import CustomerTable from './CustomerTable';
import SelectedFilters from './selected-filters';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async () => {
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-y-4">
      <SelectedFilters />
      <TableContainerHeader>
        <Tablesearch placeholder="Search Customer" />
        <AddButton>Add Customer</AddButton>
      </TableContainerHeader>
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default Page;
