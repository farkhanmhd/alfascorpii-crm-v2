import React, { Suspense } from 'react';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import CustomerJobTable from './CustomerJobTable';
import { CreateCustomerJobDialog } from './actions';

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
        <CreateCustomerJobDialog />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <CustomerJobTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
