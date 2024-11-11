import React, { Suspense } from 'react';
import { Metadata } from 'next';
import DealerTable from './DealerTable';

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
    <Suspense fallback={<div>Loading...</div>}>
      <DealerTable page={page} search={search} perPage={perPage} />
    </Suspense>
  );
};
export default Page;
