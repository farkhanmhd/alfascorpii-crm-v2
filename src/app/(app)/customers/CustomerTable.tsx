import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getCustomers } from '@/app/lib/data/customers';
import { SearchParamsProps, ICustomer } from '@/types';
import { columns } from './columns';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const customers = (await getCustomers(search, page, perPage)) as ICustomer[];
  return (
    <DataTable
      columns={columns}
      data={customers}
      totalPages={2}
      currentPage={1}
      rows={100}
      addLabel="Import Customer"
      searchPlaceholder="Cari Customer"
    />
  );
};

export default CustomerTable;
