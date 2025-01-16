import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import Tablesearch from '@/components/elements/table/tablesearch';

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
        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
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
