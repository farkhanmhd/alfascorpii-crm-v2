'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IKerabat, Column } from '@/types';

const columns: Column<IKerabat>[] = [
  {
    header: 'Kerabat',
    key: 'kerabat',
    getCellContent: (kerabat: IKerabat) => kerabat.kerabat,
  },
  {
    header: 'Status',
    key: 'status' as keyof IKerabat,
    getCellContent: (kerabat: IKerabat) => (
      <span
        className={clsx({
          'text-green-500': kerabat.status === 'SHOW',
          'text-red-500': kerabat.status === 'HIDE',
        })}
      >
        {kerabat.status}
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
