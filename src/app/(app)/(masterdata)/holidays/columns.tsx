'use client';

import React from 'react';
import clsx from 'clsx';
import { Pencil, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { IHolidays } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useDeleteDialog, useActionDialog, useSelectedDate } from '@/hooks';

const columns: ColumnDef<IHolidays>[] = [
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
    header: 'Hari Besar',
    accessorKey: 'holiday_name',
  },
  {
    header: 'Tanggal',
    accessorKey: 'holiday_date',
  },
  { header: 'Ucapan', accessorKey: 'message' },
  {
    accessorKey: 'status',
    header: 'Status',
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
    header: 'Action',
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHolidays>();
      const { setSelectedDate } = useSelectedDate();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: row.original });
        setSelectedDate(new Date(row.original.holiday_date).toString());
      };

      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleEdit}
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
