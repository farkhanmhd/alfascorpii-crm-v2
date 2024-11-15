import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import { fetchCustomerJobs } from '@/app/lib/data/customerjobs';
import DataTablePagination from '@/components/fragments/table/pagination';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const CustomerJobTable = async ({
  search = '',
  page = '1',
  perPage = '20',
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
