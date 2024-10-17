'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IDealer } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IDealer>[] = [
  { header: 'Kode', key: 'kode' as keyof IDealer },
  { header: 'Dealer', key: 'nama' as keyof IDealer },
  {
    header: 'Status',
    key: 'status' as keyof IDealer,
    getCellContent: (dealer: IDealer) => (
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
    key: 'action' as keyof IDealer,
    getCellContent: (dealer: IDealer) => (
      <Link
        className="text-primary hover:underline"
        href={`/dealer/${dealer.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
