import React, { Suspense } from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchStaff } from '@/app/lib/data/staff';
import columns from './columns';

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
  const data = await fetchStaff(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const { staffs, totalPages, total } = data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable
        columns={columns}
        data={staffs}
        rows={total}
        searchPlaceholder="Search Staff"
        addLabel="Add Staff"
        totalPages={totalPages}
        currentPage={Number(page)}
      />
    </Suspense>
  );
};
export default Page;
