'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IDegree } from '@/types';
import { EditDegreeDialog, DeleteDegreeDialog } from './actions';

export const editableDegreeColumns: ColumnDef<IDegree>[] = [
  {
    accessorKey: 'degree_name',
    header: 'Pendidikan',
  },
  {
    accessorKey: 'degree_code',
    header: 'Kode',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={clsx({
          'font-semibold text-green-500': row.getValue('status') === 'SHOW',
          'font-semibold text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => {
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditDegree =
        checkPermission('edit_education_degrees', permissions) &&
        checkPermission('view_education_degrees', permissions);
      const canDeleteDegree =
        checkPermission('delete_education_degrees', permissions) &&
        checkPermission('view_education_degrees', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditDegree && (
            <EditDegreeDialog
              id={Number(row.original.id)}
              degree={row.original.degree_name}
              code={row.original.degree_code}
              status={row.original.status}
            />
          )}
          {canDeleteDegree && (
            <DeleteDegreeDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IDegree>[] = [
  {
    accessorKey: 'degree_name',
    header: 'Pendidikan',
  },
  {
    accessorKey: 'degree_code',
    header: 'Kode',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={clsx({
          'font-semibold text-green-500': row.getValue('status') === 'SHOW',
          'font-semibold text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </div>
    ),
  },
];

export default columns;
