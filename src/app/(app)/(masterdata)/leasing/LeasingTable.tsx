import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchLeasing } from '@/app/lib/data/leasing';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const LeasingTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchLeasing(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { leasings, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={leasings} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default LeasingTable;
