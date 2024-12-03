import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchCustomer } from '@/app/lib/data/customers';
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

const CustomerTable = async () => {
  const {
    customers,
    last_page: totalPages,
    current_page: currentPage,
    total,
  } = await fetchCustomer();
  return (
    <DataTable
      columns={columns}
      data={customers}
      totalPages={totalPages}
      currentPage={currentPage}
      rows={total}
      addLabel="Import Customer"
      searchPlaceholder="Cari Customer"
    />
  );
};

export default CustomerTable;
