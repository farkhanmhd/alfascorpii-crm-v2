'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import {
  EditHouseOwnershipDialog,
  RemoveHouseOwnershipDialog,
} from './actions';

const baseColumns: ColumnDef<any>[] = [
  {
    header: 'Status Kepemilikan',
    accessorKey: 'house_ownership_status',
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
      const canEdit = checkPermission('edit_house_ownerships', permissions);
      const canDelete = checkPermission('delete_house_ownerships', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditHouseOwnershipDialog
              id={row.original.id}
              ownership={row.original.house_ownership_status}
              status={row.original.status}
            />
          )}
          {canDelete && <RemoveHouseOwnershipDialog id={row.original.id} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];
