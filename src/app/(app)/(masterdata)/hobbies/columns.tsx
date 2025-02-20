'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { EditHobbyDialog, DeleteHobbyDialog } from './actions';

const baseColumns: ColumnDef<any>[] = [
  {
    header: 'Hobi',
    accessorKey: 'hobby_name',
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
      const canEditHobby = checkPermission('edit_hobbies', permissions);
      const canDeleteHobby = checkPermission('delete_hobbies', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditHobby && (
            <EditHobbyDialog
              id={row.original.id}
              name={row.original.hobby_name}
              status={row.original.status}
            />
          )}
          {canDeleteHobby && <DeleteHobbyDialog id={row.original.id} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];
