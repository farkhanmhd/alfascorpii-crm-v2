'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IDegree, Column } from '@/types';

const columns: Column<IDegree>[] = [
  {
    header: 'Kode',
    key: 'degree_code',
    GetCellContent: (data) => data.degree_code,
  },
  {
    header: 'Pendidikan',
    key: 'degree_name',
    GetCellContent: (data) => data.degree_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (data: IDegree) => (
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
    GetCellContent: (pendidikan: IDegree) => (
      <Link
        className="text-primary hover:underline"
        href={`/customers/degrees/${pendidikan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
