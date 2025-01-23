'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { ICustomerJob } from '@/types';
import { DeleteJobDialog, EditCustomerJobDialog } from './actions';

const columns: ColumnDef<ICustomerJob>[] = [
  {
    accessorKey: 'job_code',
    header: 'Kode',
  },
  {
    accessorKey: 'job_name',
    header: 'Pekerjaan',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
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
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditCustomerJobDialog
            id={Number(row.original.id)}
            job={row.original.job_name}
            status={row.original.status}
            code={row.original.job_code}
          />
          <DeleteJobDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
