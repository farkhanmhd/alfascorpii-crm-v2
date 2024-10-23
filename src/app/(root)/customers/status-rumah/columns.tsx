'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStatusRumah, Column } from '@/types';

const columns: Column<IStatusRumah>[] = [
  {
    header: 'Status Rumah',
    key: 'status_rumah',
    getCellContent: (data: IStatusRumah) => data.status_rumah,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (statusRumah: IStatusRumah) => (
      <span
        className={clsx({
          'text-green-500': statusRumah.status === 'SHOW',
          'text-red-500': statusRumah.status === 'HIDE',
        })}
      >
        {statusRumah.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (statusRumah: IStatusRumah) => (
      <Link
        className="text-primary hover:underline"
        href={`/customer/status-rumah/${statusRumah.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
