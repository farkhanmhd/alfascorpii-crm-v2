'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IFUMethod, Column } from '@/types';

const columns: Column<IFUMethod>[] = [
  {
    header: 'Metode',
    key: 'fu_method_name',
    getCellContent: (metode: IFUMethod) => metode.fu_method_name,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (metode: IFUMethod) => (
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
    getCellContent: (metode: IFUMethod) => (
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
