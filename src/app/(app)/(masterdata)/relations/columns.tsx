'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IRelation } from '@/types';
import { EditRelationDialog, DeleteRelationDialog } from './actions';

const baseColumns: ColumnDef<IRelation>[] = [
  {
    header: 'Hubungan',
    accessorKey: 'relation_name',
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

export const editableColumns: ColumnDef<IRelation>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEdit = checkPermission('edit_relations', permissions);
      const canDelete = checkPermission('delete_relations', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditRelationDialog
              id={Number(row.original.id)}
              relation={row.original.relation_name}
              status={row.original.status}
            />
          )}
          {canDelete && <DeleteRelationDialog id={Number(row.original.id)} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];
