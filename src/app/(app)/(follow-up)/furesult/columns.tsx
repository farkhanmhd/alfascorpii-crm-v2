'use client';

import React from 'react';
import clsx from 'clsx';
import { IResultFU, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IResultFU>[] = [
  {
    header: 'Hasil Follow Up',
    key: 'fu_result_name',
    GetCellContent: (result: IResultFU) => result.fu_result_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (result: IResultFU) => (
      <span
        className={clsx({
          'text-green-500': result.status === 'SHOW',
          'text-red-500': result.status === 'HIDE',
        })}
      >
        {result.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IResultFU) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IResultFU>();

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
