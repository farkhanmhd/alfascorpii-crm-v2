import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import HouseOwnershipTable from './HouseOwnershipTable';

export const metadata: Metadata = {
  title: 'House Ownerships',
  description: 'List of House Ownerships',
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
      <HouseOwnershipTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
