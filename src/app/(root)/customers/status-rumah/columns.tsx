'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStatusRumah } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IStatusRumah>[] = [
  { header: 'Status Rumah', key: 'status_rumah' as keyof IStatusRumah },
  {
    header: 'Status',
    key: 'status' as keyof IStatusRumah,
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
    key: 'action' as keyof IStatusRumah,
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
