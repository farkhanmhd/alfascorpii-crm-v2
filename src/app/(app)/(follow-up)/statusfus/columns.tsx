'use client';

import React from 'react';
import clsx from 'clsx';
import { IStatusFU, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IStatusFU>[] = [
  {
    header: 'Keterangan',
    key: 'detail_fu_name',
    GetCellContent: (status: IStatusFU) => status.detail_fu_name || 'Null',
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (status: IStatusFU) => (
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
    header: 'Action',
    GetCellContent: (item: IStatusFU) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IStatusFU>();

      return (
        <div className="flex gap-x-4">
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
