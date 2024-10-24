'use client';

import React from 'react';
import Link from 'next/link';
import { ICustomer, Column } from '@/types';

const columns: Column<ICustomer>[] = [
  {
    header: 'Dealer',
    key: 'dealer',
    getCellContent: (customer: ICustomer) => customer.dealer,
  },
  {
    header: 'Customer',
    key: 'name',
    getCellContent: (customer: ICustomer) => customer.name,
  },
  {
    header: 'Lokasi',
    key: 'lokasi',
    getCellContent: (customer: ICustomer) => customer.lokasi,
  },
  {
    header: 'Phone',
    key: 'phone',
    getCellContent: (customer: ICustomer) => customer.phone,
  },
  {
    header: 'Follow Up',
    key: 'follow_up',
    getCellContent: (customer: ICustomer) => customer.follow_up,
  },
  {
    header: 'Action',
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
