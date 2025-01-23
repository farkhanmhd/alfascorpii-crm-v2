'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ILeasing } from '@/types';
import { EditLeasingDialog, DeleteLeasingDialog } from './actions';

const columns: ColumnDef<ILeasing>[] = [
  {
    header: 'Leasing',
    accessorKey: 'leasing_name',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditLeasingDialog
            id={Number(row.original.id)}
            leasing={row.original.leasing_name}
          />
          <DeleteLeasingDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
