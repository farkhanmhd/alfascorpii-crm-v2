import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import MasterHeader from '@/components/fragments/MasterHeader';
import HobbiesTable from './HobbiesTable';
import { CreateHobbyDialog } from './actions';

export const metadata: Metadata = {
  title: 'Hobbies',
  description: 'List of Hobbies',
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
      <MasterHeader searchPlaceholder="Cari Hobi">
        <CreateHobbyDialog />
      </MasterHeader>
      <Suspense fallback={<TableSkeleton />}>
        <HobbiesTable page={page} search={search} perPage={perPage} />
      </Suspense>
    </>
  );
};
export default Page;
