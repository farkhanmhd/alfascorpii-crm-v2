import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import LeasingTable from './LeasingTable';

export const metadata: Metadata = {
  title: 'Leasings',
  description: 'List of Leasings',
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
      <LeasingTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
