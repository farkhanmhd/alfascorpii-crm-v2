'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { EditIncomeDialog, DeleteIncomeDialog } from './actions';

const baseColumns: ColumnDef<any>[] = [
  {
    header: 'Kode',
    accessorKey: 'income_code',
  },
  {
    header: 'Detail',
    accessorKey: 'income_detail',
  },
  {
    header: 'Batas Bawah',
    accessorKey: 'income_lower_limit',
  },
  {
    header: 'Batas Atas',
    accessorKey: 'income_upper_limit',
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

export const editableColumns: ColumnDef<any>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEdit = checkPermission('edit_incomes', permissions);
      const canDelete = checkPermission('delete_incomes', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditIncomeDialog
              id={row.original.id}
              upper={row.original.income_upper_limit}
              lower={row.original.income_lower_limit}
              detail={row.original.income_detail}
              code={row.original.income_code}
              status={row.original.status}
            />
          )}
          {canDelete && <DeleteIncomeDialog id={row.original.id} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];

export default columns;
