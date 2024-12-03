import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
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
  const {
    customers,
    last_page: totalPages,
    current_page: currentPage,
    total,
  } = await fetchCustomer(search, page, perPage);
  return (
    <DataTable
      columns={columns}
      data={customers}
      totalPages={totalPages}
      currentPage={currentPage}
      rows={total}
      addLabel="Import Follow UP"
      searchPlaceholder="Cari Follow UP"
    />
  );
};

export default CustomerTable;
