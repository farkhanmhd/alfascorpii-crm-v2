'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IFUMethod } from '@/types';
import { EditFuMethodDialog, DeleteFuMethodDialog } from './actions';

const baseColumns: ColumnDef<IFUMethod>[] = [
  {
    header: 'Metode',
    accessorKey: 'fu_method_name',
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

export const editableColumns: ColumnDef<IFUMethod>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditMethod =
        checkPermission('edit_follow_up_methods', permissions) &&
        checkPermission('view_follow_up_methods', permissions);
      const canDeleteMethod =
        checkPermission('delete_follow_up_methods', permissions) &&
        checkPermission('view_follow_up_methods', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditMethod && (
            <EditFuMethodDialog
              id={Number(row.original.id)}
              method={row.original.fu_method_name}
              status={row.original.status}
            />
          )}
          {canDeleteMethod && (
            <DeleteFuMethodDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IFUMethod>[] = [...baseColumns];

export default columns;
