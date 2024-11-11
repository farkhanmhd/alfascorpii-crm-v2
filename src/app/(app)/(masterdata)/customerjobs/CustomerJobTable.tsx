import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchCustomerJobs } from '@/app/lib/data/customerjobs';
import DataTablePagination from '@/components/fragments/table/pagination';
import { SearchParamsProps } from '@/types';

const CustomerJobTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchCustomerJobs(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { jobs, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={jobs} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default CustomerJobTable;
