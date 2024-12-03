'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ILeasing } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: ColumnDef<ILeasing>[] = [
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
    header: 'Leasing',
    accessorKey: 'leasing_name',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<ILeasing>();
      return (
        <div className="flex justify-end gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: row.original })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
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
