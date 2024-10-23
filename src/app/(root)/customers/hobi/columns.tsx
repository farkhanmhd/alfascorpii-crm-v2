'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IHobi, Column } from '@/types';

const columns: Column<IHobi>[] = [
  { header: 'Hobi', key: 'hobi', getCellContent: (hobi: IHobi) => hobi.hobi },
  {
    header: 'Status',
    key: 'status' as keyof IHobi,
    getCellContent: (hobi: IHobi) => (
      <span
        className={clsx({
          'text-green-500': hobi.status === 'SHOW',
          'text-red-500': hobi.status === 'HIDE',
        })}
      >
        {hobi.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IHobi,
    getCellContent: (hobi: IHobi) => (
      <Link
        className="text-primary hover:underline"
        href={`/customer/hobi/${hobi.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
