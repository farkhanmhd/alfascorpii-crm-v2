'use client';

import React from 'react';
import clsx from 'clsx';
import { Pencil, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { IHolidays } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog, useSelectedDate } from '@/hooks';

const columns: ColumnDef<IHolidays>[] = [
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
    header: () => 'Status',
    cell: ({ row }) => (
      <div
        className={clsx({
          'font-semibold text-green-500': row.getValue('status') === 'SHOW',
          'font-semibold text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHolidays>();
      const { setSelectedDate } = useSelectedDate();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: row.original });
        setSelectedDate(new Date(row.original.holiday_date).toString());
      };

      return (
        <div className="flex justify-end gap-x-4">
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
