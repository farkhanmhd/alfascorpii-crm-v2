'use client';

import React from 'react';
import clsx from 'clsx';
import { IFUMethod, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IFUMethod>[] = [
  {
    header: 'Metode',
    key: 'fu_method_name',
    GetCellContent: (metode: IFUMethod) => metode.fu_method_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (metode: IFUMethod) => (
      <span
        className={clsx({
          'text-green-500': metode.status === 'SHOW',
          'text-red-500': metode.status === 'HIDE',
        })}
      >
        {metode.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IFUMethod) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IFUMethod>();

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
