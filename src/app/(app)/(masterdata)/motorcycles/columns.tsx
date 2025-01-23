'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
// import { Checkbox } from '@/components/ui/checkbox';
import { IMotorcycle } from '@/types';
import { EditProductDialog, DeleteProductDialog } from './actions';

const columns: ColumnDef<IMotorcycle>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),

  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    header: 'Type',
    accessorKey: 'motorcycle_type',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditProductDialog
            id={Number(row.original.id)}
            product={row.original.motorcycle_type}
          />
          <DeleteProductDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
