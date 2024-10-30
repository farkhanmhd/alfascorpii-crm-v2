'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStatusFU, Column } from '@/types';

const columns: Column<IStatusFU>[] = [
  {
    header: 'Keterangan',
    key: 'detail_fu_name',
    getCellContent: (detail: IStatusFU) => detail.detail_fu_name,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (detail: IStatusFU) => (
      <span
        className={clsx({
          'text-green-500': detail.status === 'SHOW',
          'text-red-500': detail.status === 'HIDE',
        })}
      >
        {detail.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (detail: IStatusFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/detailfu/${detail.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
