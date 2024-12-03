'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { IHouseOwnership } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: ColumnDef<IHouseOwnership>[] = [
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
    header: 'Status Rumah',
    accessorKey: 'house_ownership_status',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span
        className={clsx({
          'text-green-500': row.getValue('status') === 'SHOW',
          'text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHouseOwnership>();

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
