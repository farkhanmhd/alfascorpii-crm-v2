import React, { Suspense } from 'react';
import { Metadata } from 'next';
import DegreeTable from './DegreeTable';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';

export const metadata: Metadata = {
  title: 'Degrees',
  description: 'List of Degrees',
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
      <DegreeTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
