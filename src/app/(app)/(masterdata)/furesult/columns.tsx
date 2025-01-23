'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IResultFU } from '@/types';
import { EditFuResultDialog, DeleteFuResultDialog } from './actions';

const columns: ColumnDef<IResultFU>[] = [
  {
    header: 'Hasil Follow Up',
    accessorKey: 'fu_result_name',
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
          <EditFuResultDialog
            id={Number(row.original.id)}
            status={row.original.status}
            furesult={row.original.fu_result_name}
          />
          <DeleteFuResultDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
