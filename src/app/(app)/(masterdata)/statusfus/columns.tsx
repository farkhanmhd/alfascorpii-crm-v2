'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IStatusFU } from '@/types';
import { DeleteStatusFuDialog, EditStatusFuDialog } from './actions';

const columns: ColumnDef<IStatusFU>[] = [
  {
    accessorKey: 'status_fu_name',
    header: 'Keterangan',
  },
  {
    header: 'Status',
    cell: ({ row: { original: status } }) => (
      <span
        className={clsx({
          'font-semibold text-green-500': status.status === 'SHOW',
          'font-semibold text-red-500': status.status === 'HIDE',
        })}
      >
        {status.status}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditStatusFuDialog
            id={Number(row.original.id)}
            status={row.original.status}
            method={String(row.original.fu_method_id)}
            name={row.original.status_fu_name as string}
          />
          <DeleteStatusFuDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
