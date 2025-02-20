'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { EditFuResultDialog, DeleteFuResultDialog } from './actions';

const baseColumns: ColumnDef<any>[] = [
  {
    header: 'Hasil',
    accessorKey: 'fu_result_name',
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
      const canEditResult = checkPermission(
        'edit_follow_up_results',
        permissions
      );
      const canDeleteResult = checkPermission(
        'delete_follow_up_results',
        permissions
      );

      return (
        <div className="flex justify-end gap-x-4">
          {canEditResult && (
            <EditFuResultDialog
              id={row.original.id}
              status={row.original.status}
              furesult={row.original.fu_result_name}
            />
          )}
          {canDeleteResult && <DeleteFuResultDialog id={row.original.id} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];
