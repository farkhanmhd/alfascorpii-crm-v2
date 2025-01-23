import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import { getStatusFuOptions } from '@/app/lib/data/statusfus';
import FuResultTable from './FuResultTable';
import { CreateFuResultDialog } from './actions';

export const metadata: Metadata = {
  title: 'Follow Up Results',
  description: 'List of Follow Up Results',
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
  const statusFuOptions = await getStatusFuOptions();

  return (
    <>
      <MasterHeader searchPlaceholder="Cari Hasil Follow Up">
        <CreateFuResultDialog statusFuOptions={statusFuOptions} />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <FuResultTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
