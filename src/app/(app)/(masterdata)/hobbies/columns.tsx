'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IHobby } from '@/types';
import { EditHobbyDialog, DeleteHobbyDialog } from './actions';

const columns: ColumnDef<IHobby>[] = [
  {
    header: 'Hobi',
    accessorKey: 'hobby_name',
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
          <EditHobbyDialog
            id={Number(row.original.id)}
            name={row.original.hobby_name}
            status={row.original.status}
          />
          <DeleteHobbyDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
