import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import IncomeTable from './IncomeTable';
import { CreateIncomeDialog } from './actions';

export const metadata: Metadata = {
  title: 'Incomes',
  description: 'List of Incomes',
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
      <MasterHeader searchPlaceholder="Cari Pekerjaan">
        <CreateIncomeDialog />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <IncomeTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
