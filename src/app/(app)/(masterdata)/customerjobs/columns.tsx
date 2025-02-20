'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { ICustomerJob } from '@/types';
import { EditCustomerJobDialog, DeleteJobDialog } from './actions';

export const editableCustomerJobColumns: ColumnDef<ICustomerJob>[] = [
  {
    accessorKey: 'job_name',
    header: 'Customer Job',
  },
  {
    id: 'actions',
    header: () => {
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditJob =
        checkPermission('edit_jobs', permissions) &&
        checkPermission('view_jobs', permissions);
      const canDeleteJob =
        checkPermission('delete_jobs', permissions) &&
        checkPermission('view_jobs', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditJob && (
            <EditCustomerJobDialog
              id={Number(row.original.id)}
              job={row.original.job_name}
              code={row.original.job_code}
              status={row.original.status}
            />
          )}
          {canDeleteJob && <DeleteJobDialog id={Number(row.original.id)} />}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<ICustomerJob>[] = [
  {
    accessorKey: 'job_name',
    header: 'Customer Job',
  },
];

export default columns;
