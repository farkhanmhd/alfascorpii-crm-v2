'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IMotorcycle } from '@/types';
import { EditProductDialog, DeleteProductDialog } from './actions';

const baseColumns: ColumnDef<IMotorcycle>[] = [
  {
    header: 'Tipe',
    accessorKey: 'motorcycle_type',
  },
];

export const editableColumns: ColumnDef<IMotorcycle>[] = [
  ...baseColumns,
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEdit = checkPermission('edit_motorcycle', permissions);
      const canDelete = checkPermission('delete_motorcycle', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEdit && (
            <EditProductDialog
              id={Number(row.original.id)}
              product={row.original.motorcycle_type}
            />
          )}
          {canDelete && <DeleteProductDialog id={Number(row.original.id)} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IMotorcycle>[] = [...baseColumns];
