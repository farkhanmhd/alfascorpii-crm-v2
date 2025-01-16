import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { fetchCustomer } from '@/app/lib/data/customers';
import { SearchParamsProps } from '@/types';
import { columns } from './columns';

export interface FlatCustomer {
  id: string;
  name: string;
  district: string;
  city: string;
  address: string;
  phoneNumber: string;
  dealerCode: string;
  dealerName: string;
}

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  // await delay(2000);
  const {
    customers,
    last_page: totalPages,
    total,
  } = await fetchCustomer(search, page, perPage);
  return (
    <DataTable
      columns={columns}
      data={customers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default CustomerTable;
