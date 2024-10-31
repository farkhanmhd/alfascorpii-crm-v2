'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IHolidays, Column } from '@/types';

const columns: Column<IHolidays>[] = [
  {
    header: 'Hari Besar',
    key: 'holiday_name',
    GetCellContent: (item) => item.holiday_name,
  },
  {
    header: 'Tanggal',
    key: 'holiday_date',
    GetCellContent: (item) => item.holiday_date,
  },
  { header: 'Ucapan', key: 'message', GetCellContent: (item) => item.message },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (hari: IHolidays) => (
      <span
        className={clsx({
          'text-green-500': hari.status === 'SHOW',
          'text-red-500': hari.status === 'HIDE',
        })}
      >
        {hari.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (hari: IHolidays) => (
      <Link
        className="text-primary hover:underline"
        href={`/hari-besar/${hari.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
