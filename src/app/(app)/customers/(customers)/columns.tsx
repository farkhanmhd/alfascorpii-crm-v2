'use client';

import React from 'react';
import Link from 'next/link';
import { ICustomer, Column } from '@/types';

const columns: Column<ICustomer>[] = [
  {
    header: 'Dealer',
    key: 'dealer',
    GetCellContent: (customer: ICustomer) => customer.dealer,
  },
  {
    header: 'Customer',
    key: 'name',
    GetCellContent: (customer: ICustomer) => customer.name,
  },
  {
    header: 'Lokasi',
    key: 'lokasi',
    GetCellContent: (customer: ICustomer) => customer.lokasi,
  },
  {
    header: 'Phone',
    key: 'phone',
    GetCellContent: (customer: ICustomer) => customer.phone,
  },
  {
    header: 'Follow Up',
    key: 'follow_up',
    GetCellContent: (customer: ICustomer) => customer.follow_up,
  },
  {
    header: 'Action',
    GetCellContent: (customer: ICustomer) => (
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
