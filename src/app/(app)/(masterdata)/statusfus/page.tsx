import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import StatusFuTable from './StatusFuTable';

export const metadata: Metadata = {
  title: 'Follow Up Status',
  description: 'List of Follow Up Statuses',
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
      <StatusFuTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
