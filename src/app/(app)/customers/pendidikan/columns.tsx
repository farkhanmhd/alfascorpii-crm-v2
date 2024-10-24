'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPendidikan, Column } from '@/types';

const columns: Column<IPendidikan>[] = [
  {
    header: 'Pendidikan',
    key: 'pendidikan',
    getCellContent: (data) => data.pendidikan,
  },
  { header: 'Kode', key: 'kode', getCellContent: (data) => data.kode },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (data: IPendidikan) => (
      <span
        className={clsx({
          'text-green-500': data.status === 'SHOW',
          'text-red-500': data.status === 'HIDE',
        })}
      >
        {data.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (pendidikan: IPendidikan) => (
      <Link
        className="text-primary hover:underline"
        href={`/pendidikan/${pendidikan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
