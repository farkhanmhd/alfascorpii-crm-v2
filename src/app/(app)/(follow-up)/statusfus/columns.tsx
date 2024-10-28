'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStatusFU, Column } from '@/types';

const columns: Column<IStatusFU>[] = [
  {
    header: 'Keterangan',
    key: 'detail_fu_name',
    getCellContent: (status: IStatusFU) => status.detail_fu_name || 'Null',
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (status: IStatusFU) => (
      <span
        className={clsx({
          'text-green-500': status.status === 'SHOW',
          'text-red-500': status.status === 'HIDE',
        })}
      >
        {status.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (keterangan: IStatusFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/keterangan-fu/${keterangan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
