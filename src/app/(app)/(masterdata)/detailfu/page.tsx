import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import { getStatusFuOptions } from '@/app/lib/data/statusfus';
import FuDetailTable from './FuDetailTable';
import { CreateDetailFuDialog } from './actions';

export const metadata: Metadata = {
  title: 'Follow Up Details',
  description: 'List of Follow Up Details',
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
  const statuses = await getStatusFuOptions();
  return (
    <>
      <MasterHeader searchPlaceholder="Cari Keterangan Follow Up">
        <CreateDetailFuDialog statuses={statuses} />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <FuDetailTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
