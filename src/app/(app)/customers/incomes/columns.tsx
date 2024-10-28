'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IIncome, Column } from '@/types';

const columns: Column<IIncome>[] = [
  {
    header: 'Batas Bawah',
    key: 'income_lower_limit',
    getCellContent: (data: IIncome) => data.income_lower_limit,
  },
  {
    header: 'Batas Atas',
    key: 'income_upper_limit',
    getCellContent: (data: IIncome) => data.income_upper_limit,
  },
  {
    header: 'Detail',
    key: 'income_detail',
    getCellContent: (data: IIncome) => data.income_detail,
  },
  {
    header: 'Kode',
    key: 'income_code',
    getCellContent: (data: IIncome) => data.income_code,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (data: IIncome) => (
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
    getCellContent: (data: IIncome) => (
      <Link
        className="text-primary hover:underline"
        href={`/incomes/${data.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
