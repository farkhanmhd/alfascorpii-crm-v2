'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { IDegree } from '@/types';
import { EditDegreeDialog, DeleteDegreeDialog } from './actions';

const columns: ColumnDef<IDegree>[] = [
  {
    header: 'Kode',
    accessorKey: 'degree_code',
  },
  {
    header: 'Pendidikan',
    accessorKey: 'degree_name',
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
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditDegreeDialog
            id={Number(row.original.id)}
            degree={row.original.degree_name}
            code={row.original.degree_code}
            status={row.original.status}
          />
          <DeleteDegreeDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
