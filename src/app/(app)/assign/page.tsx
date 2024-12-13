import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import CustomerTable from './CustomerTable';

export const metadata: Metadata = {
  title: 'Assign to CRO',
  description: 'Assign to CRO',
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
    <Suspense fallback={<TableSkeleton />}>
      <CustomerTable search={search} page={page} perPage={perPage} />
    </Suspense>
  );
};

export default Page;
