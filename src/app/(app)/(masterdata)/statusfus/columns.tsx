'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IStatusFU } from '@/types';
import { EditStatusFuDialog, DeleteStatusFuDialog } from './actions';

const baseColumns: ColumnDef<IStatusFU>[] = [
  {
    header: 'Keterangan',
    accessorKey: 'status_fu_name',
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

export const editableColumns: ColumnDef<IStatusFU>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEdit = checkPermission('edit_status_follow_up', permissions);
      const canDelete = checkPermission('delete_status_follow_up', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditStatusFuDialog
              id={Number(row.original.id)}
              method={String(row.original.fu_method_id)}
              name={row.original.status_fu_name!}
              status={row.original.status}
            />
          )}
          {canDelete && <DeleteStatusFuDialog id={Number(row.original.id)} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IStatusFU>[] = [...baseColumns];
