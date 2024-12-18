'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { IDegree } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: ColumnDef<IDegree>[] = [
  {
    header: 'Kode',
    accessorKey: 'degree_code',
  },
  {
    header: 'Pendidikan',
    accessorKey: 'degree_name',
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
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDegree>();
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
