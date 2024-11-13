import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import { getCustomers } from '@/app/lib/data/customers';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const CustomerTable = async () => {
  const data = await getCustomers();

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const customers = data.sort((a, b) => a.id - b.id);
  return (
    <>
      <DataTable columns={columns} data={customers} includeIndex />
      <DataTablePagination currentPage={1} totalPages={5} />
    </>
  );
};

export default CustomerTable;
