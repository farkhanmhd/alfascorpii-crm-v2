'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IKerabat } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IKerabat>[] = [
  { header: 'Kerabat', key: 'kerabat' as keyof IKerabat },
  {
    header: 'Status',
    key: 'status' as keyof IKerabat,
    getCellContent: (dealer: IKerabat) => (
      <span
        className={clsx({
          'text-green-500': dealer.status === 'SHOW',
          'text-red-500': dealer.status === 'HIDE',
        })}
      >
        {dealer.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IKerabat,
    getCellContent: (customer: IKerabat) => (
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
