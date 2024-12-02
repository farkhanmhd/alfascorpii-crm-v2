import React from 'react';
import { getCustomers, CustomerPage } from '@/app/lib/data/customers';
import { DataTable } from '../data-table';
import { columns } from './columns';

interface CustomerTableProps {
  searchQuery: string;
  page: number;
  perPage: number;
}

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

const flattenedCustomer = (data: { data: CustomerPage[] }): FlatCustomer[] => {
  return data.data.map((item) => {
    const { id, name, district, city, address, phoneNumber, purchases } = item;

    const dealer = purchases?.[0]?.purchase?.purchaseDealers?.[0]?.dealer || {};

    return {
      id,
      name,
      district,
      city,
      address,
      phoneNumber,
      dealerCode: dealer.dealerCode || '',
      dealerName: dealer.dealerName || '',
    };
  }) as FlatCustomer[];
};

const CustomerTable: React.FC<CustomerTableProps> = async ({
  searchQuery,
  page,
  perPage,
}) => {
  const {
    data: customers,
    rows,
    totalPages,
  } = await getCustomers({
    searchQuery,
    page,
    perPage,
  });

  if (!customers) {
    throw new Error('Failed to fetch data');
  }

  const data = flattenedCustomer({ data: customers });
  return (
    <DataTable
      columns={columns}
      data={data}
      currentPage={page}
      rows={rows}
      totalPages={totalPages}
    />
  );
};

export default CustomerTable;
