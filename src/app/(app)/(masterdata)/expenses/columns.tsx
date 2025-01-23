'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IExpense } from '@/types';
import { EditExpenseDialog, DeleteExpenseDialog } from './actions';

const columns: ColumnDef<IExpense>[] = [
  {
    header: 'Batas Bawah',
    accessorKey: 'expense_lower_limit',
  },
  {
    header: 'Batas Atas',
    accessorKey: 'expense_upper_limit',
  },
  {
    header: 'Detail',
    accessorKey: 'expense_detail',
  },
  {
    header: 'Kode',
    accessorKey: 'expense_code',
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
          <EditExpenseDialog
            id={Number(row.original.id)}
            upper={Number(row.original.expense_upper_limit)}
            lower={Number(row.original.expense_lower_limit)}
            detail={row.original.expense_detail}
            code={row.original.expense_code}
            status={row.original.status}
          />
          <DeleteExpenseDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
