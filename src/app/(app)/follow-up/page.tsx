import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import Tablesearch from '@/components/fragments/table/tablesearch';

import FollowUpTable from './FollowUpTable';
import FollowUpFilters from './filters';

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
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col gap-y-6 pb-6">
        <FollowUpFilters />
        <div className="flex items-center justify-between gap-x-4">
          <Tablesearch placeholder="Cari Customer" />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />}>
        <FollowUpTable search={search} page={page} perPage={perPage} />
      </Suspense>
    </div>
  );
};

export default Page;
