import React, { Suspense } from 'react';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import CustomerJobTable from './CustomerJobTable';

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
    <Suspense fallback={<TableSkeleton />}>
      <CustomerJobTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
