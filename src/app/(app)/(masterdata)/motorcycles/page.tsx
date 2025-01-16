import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MotorcyclesTable from './MotorcyclesTable';

export const metadata: Metadata = {
  title: 'Products',
  description: 'List of Products',
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
      <MotorcyclesTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
