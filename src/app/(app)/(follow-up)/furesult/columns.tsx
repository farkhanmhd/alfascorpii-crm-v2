'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IResultFU, Column } from '@/types';

const columns: Column<IResultFU>[] = [
  {
    header: 'Hasil Follow Up',
    key: 'fu_result_name',
    GetCellContent: (result: IResultFU) => result.fu_result_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (result: IResultFU) => (
      <span
        className={clsx({
          'text-green-500': result.status === 'SHOW',
          'text-red-500': result.status === 'HIDE',
        })}
      >
        {result.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (result: IResultFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/furesult/${result.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
