'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { EditColorDialog, DeleteColorDialog } from './actions';

interface IColor {
  id: number;
  color_name: string;
}

export const editableColorColumns: ColumnDef<IColor>[] = [
  {
    accessorKey: 'color_name',
    header: 'Warna',
  },
  {
    id: 'actions',

    header: () => {
      const { permissions } = usePermissions();
      const canEditColor =
        checkPermission('edit_colors', permissions) &&
        checkPermission('view_colors', permissions);
      const canDeleteColor =
        checkPermission('delete_colors', permissions) &&
        checkPermission('view_colors', permissions);

      if (!canEditColor && !canDeleteColor) return null;
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditColor =
        checkPermission('edit_colors', permissions) &&
        checkPermission('view_colors', permissions);
      const canDeleteColor =
        checkPermission('delete_colors', permissions) &&
        checkPermission('view_colors', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditColor && (
            <EditColorDialog
              id={Number(row.original.id)}
              color_name={row.original.color_name}
            />
          )}
          {canDeleteColor && <DeleteColorDialog id={Number(row.original.id)} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IColor>[] = [
  {
    accessorKey: 'color_name',
    header: 'Warna',
  },
];
