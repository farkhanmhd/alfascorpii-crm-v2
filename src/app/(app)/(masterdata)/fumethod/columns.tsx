'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IFUMethod } from '@/types';
import { DeleteFuMethodDialog, EditFuMethodDialog } from './actions';

const columns: ColumnDef<IFUMethod>[] = [
  {
    header: 'Metode',
    accessorKey: 'fu_method_name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
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
          <EditFuMethodDialog
            id={Number(row.original.id)}
            method={row.original.fu_method_name}
            status={row.original.status}
          />
          <DeleteFuMethodDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
