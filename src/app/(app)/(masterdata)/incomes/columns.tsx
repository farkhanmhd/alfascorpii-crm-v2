'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IIncome } from '@/types';
import { DeleteIncomeDialog, EditIncomeDialog } from './actions';

const columns: ColumnDef<IIncome>[] = [
  {
    header: 'Batas Bawah',
    accessorKey: 'income_lower_limit',
  },
  {
    header: 'Batas Atas',
    accessorKey: 'income_upper_limit',
  },
  {
    header: 'Detail',
    accessorKey: 'income_detail',
  },
  {
    header: 'Kode',
    accessorKey: 'income_code',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span
        className={clsx({
          'font-semibold text-green-500': row.getValue('status') === 'SHOW',
          'font-semibold text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditIncomeDialog
            id={Number(row.original.id)}
            code={row.original.income_code}
            status={row.original.status}
            upper={Number(row.original.income_upper_limit)}
            lower={Number(row.original.income_lower_limit)}
            detail={row.original.income_detail}
          />
          <DeleteIncomeDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
