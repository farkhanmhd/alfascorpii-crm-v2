import React, { Suspense } from 'react';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import { fetchStaff } from '@/app/lib/data';
import StaffTable from './StaffTable';

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
}) => {
  const search = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const { staffs = [], totalPages } = await fetchStaff(search, page, limit);

  if (!staffs || staffs.length === 0) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch staff</div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <Tablesearch placeholder="Search staff..." />
      <Suspense fallback={<div>Loading...</div>}>
        <StaffTable staffs={staffs} />
      </Suspense>
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </div>
  );
};
export default Page;
