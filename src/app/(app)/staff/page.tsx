import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import Tablesearch from '@/components/elements/table/tablesearch';
import { getAllDealersList } from '@/app/lib/data/dealers';
import StaffTable from './StaffTable';
import { AddStaffDialog } from './actions';
import UserFilter from './filters';

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
  const dealers = await getAllDealersList();
  return (
    <div>
      <header className="flex gap-x-4 pb-6">
        <Tablesearch placeholder="Cari Staff" />
        <UserFilter dealers={dealers} />
        <div className="ml-auto">
          <AddStaffDialog />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />}>
        <StaffTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </div>
  );
};
export default Page;
