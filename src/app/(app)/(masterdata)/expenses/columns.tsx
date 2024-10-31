'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IExpense, Column } from '@/types';

const columns: Column<IExpense>[] = [
  {
    header: 'Batas Bawah',
    key: 'expense_lower_limit',
    GetCellContent: (data: IExpense) => data.expense_lower_limit,
  },
  {
    header: 'Batas Atas',
    key: 'expense_upper_limit',
    GetCellContent: (data: IExpense) => data.expense_upper_limit,
  },
  {
    header: 'Detail',
    key: 'expense_detail',
    GetCellContent: (data: IExpense) => data.expense_detail,
  },
  {
    header: 'Kode',
    key: 'expense_code',
    GetCellContent: (data: IExpense) => data.expense_code,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (data: IExpense) => (
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
    GetCellContent: (pengeluaran: IExpense) => (
      <Link
        className="text-primary hover:underline"
        href={`/expenses/${pengeluaran.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
