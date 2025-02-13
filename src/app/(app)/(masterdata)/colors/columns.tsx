'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { EditColorDialog, DeleteColorDialog } from './actions';

interface IColor {
  id: number;
  color_name: string;
}

const columns: ColumnDef<IColor>[] = [
  {
    accessorKey: 'color_name',
    header: 'Warna',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditColorDialog
            id={Number(row.original.id)}
            color_name={row.original.color_name}
          />
          <DeleteColorDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
