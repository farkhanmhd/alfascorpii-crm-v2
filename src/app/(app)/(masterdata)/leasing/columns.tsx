'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ILeasing } from '@/types';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { EditLeasingDialog, DeleteLeasingDialog } from './actions';

export const editableLeasingColumns: ColumnDef<ILeasing>[] = [
  {
    header: 'Leasing',
    accessorKey: 'leasing_name',
  },
  {
    id: 'actions',
    header: () => {
      const { permissions } = usePermissions();
      const canEditLeasing =
        checkPermission('edit_leasing', permissions) &&
        checkPermission('view_leasings', permissions);
      const canDeleteLeasing =
        checkPermission('delete_leasing', permissions) &&
        checkPermission('view_leasings', permissions);

      if (!canEditLeasing && !canDeleteLeasing) return null;
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditLeasing =
        checkPermission('edit_leasing', permissions) &&
        checkPermission('view_leasings', permissions);
      const canDeleteLeasing =
        checkPermission('delete_leasing', permissions) &&
        checkPermission('view_leasings', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditLeasing && (
            <EditLeasingDialog
              id={Number(row.original.id)}
              leasing={row.original.leasing_name}
            />
          )}
          {canDeleteLeasing && (
            <DeleteLeasingDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<ILeasing>[] = [
  {
    header: 'Leasing',
    accessorKey: 'leasing_name',
  },
];

export default columns;
