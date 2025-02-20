'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IServiceType } from '@/types';
import { EditServiceTypeDialog, DeleteServiceTypeDialog } from './actions';

const baseColumns: ColumnDef<IServiceType>[] = [
  {
    header: 'Tipe Service',
    accessorKey: 'service_name',
  },
];

export const editableColumns: ColumnDef<IServiceType>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEdit = checkPermission('edit_service_types', permissions);
      const canDelete = checkPermission('delete_service_types', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditServiceTypeDialog
              id={Number(row.original.id)}
              name={row.original.service_name}
            />
          )}
          {canDelete && (
            <DeleteServiceTypeDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<any>[] = [...baseColumns];
