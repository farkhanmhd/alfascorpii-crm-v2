import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import MotorcyclesTable from './MotorcyclesTable';
import { CreateProductDialog } from './actions';

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
    <>
      <MasterHeader searchPlaceholder="Cari Sepeda Motor">
        <CreateProductDialog />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <MotorcyclesTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
