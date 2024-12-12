import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getCustomers } from '@/app/lib/data/customers';
import { SearchParamsProps, ICustomer } from '@/types';
import { columns } from './columns';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await getCustomers(search, page, perPage);

  const { totalRows, totalPages } = data;
  const customers = data.customers as ICustomer[];

  return (
    <DataTable
      columns={columns}
      data={customers}
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={totalRows}
      addLabel="Import Customer"
      searchPlaceholder="Cari Customer"
    />
  );
};

export default CustomerTable;
