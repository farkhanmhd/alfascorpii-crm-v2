'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IExpense } from '@/types';
import { EditExpenseDialog, DeleteExpenseDialog } from './actions';

const baseColumns: ColumnDef<IExpense>[] = [
  {
    header: 'Detail',
    accessorKey: 'expense_detail',
  },
  {
    header: 'Kode',
    accessorKey: 'expense_code',
  },
  {
    header: 'Batas Bawah',
    accessorKey: 'expense_lower_limit',
  },
  {
    header: 'Batas Atas',
    accessorKey: 'expense_upper_limit',
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
];

export const editableColumns: ColumnDef<IExpense>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditExpense =
        checkPermission('edit_expenses', permissions) &&
        checkPermission('view_expenses', permissions);
      const canDeleteExpense =
        checkPermission('delete_expenses', permissions) &&
        checkPermission('view_expenses', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditExpense && (
            <EditExpenseDialog
              id={Number(row.original.id)}
              upper={Number(row.original.expense_upper_limit)}
              lower={Number(row.original.expense_lower_limit)}
              detail={row.original.expense_detail}
              code={row.original.expense_code}
              status={row.original.status}
            />
          )}
          {canDeleteExpense && (
            <DeleteExpenseDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IExpense>[] = [...baseColumns];

export default columns;
