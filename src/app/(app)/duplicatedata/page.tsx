import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import HeaderLayout from './header-layout';

import CustomerTable from './CustomerTable';

export const metadata: Metadata = {
  title: 'Follow Up',
  description: 'List Follow Up',
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
    <HeaderLayout>
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable search={search} page={page} perPage={perPage} />
      </Suspense>
    </HeaderLayout>
  );
};

export default Page;
