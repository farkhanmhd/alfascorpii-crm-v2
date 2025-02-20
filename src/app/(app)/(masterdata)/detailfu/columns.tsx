'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IDetailFU } from '@/types';
import { EditDetailFuDialog, DeleteDetailFuDialog } from './actions';

export const editableColumns: ColumnDef<IDetailFU>[] = [
  {
    header: 'Keterangan',
    accessorKey: 'detail_fu_name',
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
      const { permissions } = usePermissions();
      const canEditDetail =
        checkPermission('edit_follow_up_details', permissions) &&
        checkPermission('view_follow_up_details', permissions);
      const canDeleteDetail =
        checkPermission('delete_follow_up_details', permissions) &&
        checkPermission('view_follow_up_details', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditDetail && (
            <EditDetailFuDialog
              detailId={row.original.id}
              statusFuId={String(row.original.status_fu_id)}
              detail={row.original.detail_fu_name}
              status={row.original.status}
            />
          )}
          {canDeleteDetail && <DeleteDetailFuDialog id={row.original.id} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IDetailFU>[] = [
  {
    header: 'Keterangan',
    accessorKey: 'detail_fu_name',
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

export default columns;
