'use client';

import React from 'react';
import clsx from 'clsx';
import { Pencil, Trash } from 'lucide-react';
import { IDetailFU, Column } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IDetailFU>[] = [
  {
    header: 'Keterangan',
    key: 'detail_fu_name',
    GetCellContent: (detail: IDetailFU) => detail.detail_fu_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (detail: IDetailFU) => (
      <span
        className={clsx({
          'text-green-500': detail.status === 'SHOW',
          'text-red-500': detail.status === 'HIDE',
        })}
      >
        {detail.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IDetailFU) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDetailFU>();

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
