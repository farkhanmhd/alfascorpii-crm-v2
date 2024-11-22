import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import { getCustomers } from '@/app/lib/data/customers';
import DataTablePagination from '@/components/fragments/table/pagination';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const CustomerTable = async ({
  search = '',
  page,
  per_page,
}: SearchParamsProps) => {
  const { data: customers, totalPages } = await getCustomers({
    searchQuery: search,
    page: Number(page),
    perPage: Number(per_page),
  });

  if (!customers) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={customers}
        includeIndex
        currentPage={Number(page)}
        perPage={Number(per_page)}
      />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default CustomerTable;
