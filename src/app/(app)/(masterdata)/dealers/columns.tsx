'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { IDealer } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: ColumnDef<IDealer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dealer_code',
    header: 'Kode',
  },
  {
    accessorKey: 'dealer_name',
    header: 'Nama',
  },
  {
    accessorKey: 'dealer_area',
    header: 'Area',
  },
  {
    accessorKey: 'dealer_type',
    header: 'Type',
  },
  {
    id: 'action',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDealer>();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: row.original });
      };

      return (
        <div className="flex justify-end gap-x-4">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialog({ open: true, id: row.original.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
