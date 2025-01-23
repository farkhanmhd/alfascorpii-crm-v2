import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import DealerTable from './DealerTable';
import { CreateDealerDialog } from './actions';

export const metadata: Metadata = {
  title: 'Dealers',
  description: 'List of Dealers',
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
    <>
      <MasterHeader searchPlaceholder="Cari Dealer">
        <CreateDealerDialog />
      </MasterHeader>

      <Suspense fallback={<TableSkeleton />}>
        <DealerTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
