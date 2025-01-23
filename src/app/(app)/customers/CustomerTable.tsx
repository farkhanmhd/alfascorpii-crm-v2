import React from 'react';
import { getFilteredCustomers } from '@/app/lib/data/customers';
import { columns } from './columns';
import CustomerTableData from './CustomerTableData';

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

const CustomerTable = async (params: any) => {
  const {
    customers,
    lastPage: totalPages,
    total,
  } = await getFilteredCustomers(params);
  return (
    <CustomerTableData
      columns={columns}
      data={customers}
      currentPage={Number(params.page)}
      totalPages={totalPages}
      rows={total}
    />
  );
};

export default CustomerTable;
