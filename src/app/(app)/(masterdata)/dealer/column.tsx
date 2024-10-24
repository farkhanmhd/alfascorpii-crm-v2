'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IDealer, Column } from '@/types';

const columns: Column<IDealer>[] = [
  {
    header: 'Kode',
    key: 'kode',
    getCellContent: (dealer: IDealer) => dealer.kode,
  },
  {
    header: 'Dealer',
    key: 'nama',
    getCellContent: (dealer: IDealer) => dealer.nama,
  },
  {
    header: 'Status',
    key: 'status',
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
