'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IHouseOwnership, Column } from '@/types';

const columns: Column<IHouseOwnership>[] = [
  {
    header: 'Status Rumah',
    key: 'house_ownership_status',
    getCellContent: (data: IHouseOwnership) => data.house_ownership_status,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (statusRumah: IHouseOwnership) => (
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
    getCellContent: (statusRumah: IHouseOwnership) => (
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
