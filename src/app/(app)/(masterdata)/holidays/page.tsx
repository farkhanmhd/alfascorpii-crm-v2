import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import HolidayTable from './HolidayTable';

export const metadata: Metadata = {
  title: 'Holidays',
  description: 'List of Holiday Dates',
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
    <Suspense fallback={<TableSkeleton />}>
      <HolidayTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
