'use client';

import React from 'react';
import Link from 'next/link';
import { ICustomer } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<ICustomer>[] = [
  { header: 'Dealer', key: 'dealer' as keyof ICustomer },
  { header: 'Customer', key: 'name' as keyof ICustomer },
  { header: 'Lokasi', key: 'lokasi' as keyof ICustomer },
  { header: 'Telepon', key: 'phone' as keyof ICustomer },
  { header: 'Follow Up', key: 'follow_up' as keyof ICustomer },
  {
    header: 'Action',
    key: 'action' as keyof ICustomer,
    getCellContent: (customer: ICustomer) => (
      <Link
        className="text-primary hover:underline"
        href={`/customer/${customer.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
