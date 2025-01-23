'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IRelation } from '@/types';
import { DeleteRelationDialog, EditRelationDialog } from './actions';

const columns: ColumnDef<IRelation>[] = [
  {
    header: 'Kerabat',
    accessorKey: 'relation_name',
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
          <EditRelationDialog
            id={Number(row.original.id)}
            relation={row.original.relation_name}
            status={row.original.status}
          />
          <DeleteRelationDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
