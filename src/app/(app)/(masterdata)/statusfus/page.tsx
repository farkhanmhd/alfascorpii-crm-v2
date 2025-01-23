import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import { getFuMethodOptions } from '@/app/lib/data/fumethod';
import StatusFuTable from './StatusFuTable';
import { CreateStatusFuDialog } from './actions';

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
  const followUpMethodOptions = await getFuMethodOptions();
  return (
    <>
      <MasterHeader searchPlaceholder="Cari Status Follow Up">
        <CreateStatusFuDialog methodOptions={followUpMethodOptions} />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <StatusFuTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
