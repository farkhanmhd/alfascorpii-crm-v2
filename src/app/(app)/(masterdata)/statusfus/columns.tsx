'use client';

import React from 'react';
import clsx from 'clsx';
import { Pencil, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { IStatusFU } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: ColumnDef<IStatusFU>[] = [
  {
    accessorKey: 'detail_fu_name',
    header: 'Keterangan',
  },
  {
    header: 'Status',
    cell: ({ row: { original: status } }) => (
      <span
        className={clsx({
          'text-green-500': status.status === 'SHOW',
          'text-red-500': status.status === 'HIDE',
        })}
      >
        {status.status}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row: { original: item } }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IStatusFU>();

      return (
        <div className="flex justify-end gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: item })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: item.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
