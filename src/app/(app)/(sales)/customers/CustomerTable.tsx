import React from 'react';
import { getFilteredCustomers } from '@/app/lib/data/customers';
import CustomerTableWrapper from './CustomerTableWrapper';

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
  const data = await getFilteredCustomers(params);
  return <CustomerTableWrapper data={data} page={params.page} />;
};

export default CustomerTable;
