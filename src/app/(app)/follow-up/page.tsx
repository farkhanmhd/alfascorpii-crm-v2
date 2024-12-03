import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import CustomerTable from './CustomerTable';
import SelectedFilters from './selected-filters';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
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
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-y-4">
      <SelectedFilters />
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable search={search} page={page} perPage={perPage} />
      </Suspense>
    </div>
  );
};

export default Page;
