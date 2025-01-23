'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IDetailFU } from '@/types';
import { EditDetailFuDialog, DeleteDetailFuDialog } from './actions';

const columns: ColumnDef<IDetailFU>[] = [
  {
    header: 'Keterangan',
    accessorKey: 'detail_fu_name',
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
          <EditDetailFuDialog
            detailId={row.original.id}
            statusFuId={String(row.original.status_fu_id)}
            detail={row.original.detail_fu_name}
            status={row.original.status}
          />
          <DeleteDetailFuDialog id={row.original.id} />
        </div>
      );
    },
  },
];

export default columns;
