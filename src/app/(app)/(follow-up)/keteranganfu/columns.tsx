'use client';

import React from 'react';
import clsx from 'clsx';
import { Link } from 'next-view-transitions';
import { IStatusFU, Column } from '@/types';

const columns: Column<IStatusFU>[] = [
  {
    header: 'Keterangan',
    key: 'detail_fu_name',
    GetCellContent: (detail: IStatusFU) => detail.detail_fu_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (detail: IStatusFU) => (
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
    GetCellContent: (detail: IStatusFU) => (
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
