'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IHouseOwnership } from '@/types';
import {
  EditHouseOwnershipDialog,
  RemoveHouseOwnershipDialog,
} from './actions';

const columns: ColumnDef<IHouseOwnership>[] = [
  {
    header: 'Status Rumah',
    accessorKey: 'house_ownership_status',
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
          <EditHouseOwnershipDialog
            id={Number(row.original.id)}
            ownership={row.original.house_ownership_status}
            status={row.original.status}
          />
          <RemoveHouseOwnershipDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
