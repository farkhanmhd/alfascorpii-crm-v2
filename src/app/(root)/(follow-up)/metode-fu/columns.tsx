'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IMetodeFU, Column } from '@/types';

const columns: Column<IMetodeFU>[] = [
  {
    header: 'Metode',
    key: 'metode',
    getCellContent: (metode: IMetodeFU) => metode.metode,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (metode: IMetodeFU) => (
      <span
        className={clsx({
          'text-green-500': metode.status === 'SHOW',
          'text-red-500': metode.status === 'HIDE',
        })}
      >
        {metode.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (metode: IMetodeFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/metode-fu/${metode.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
