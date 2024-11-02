'use client';

import React from 'react';
import clsx from 'clsx';
import { IHobby, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IHobby>[] = [
  {
    header: 'Hobi',
    key: 'hobby_name',
    GetCellContent: (hobby: IHobby) => hobby.hobby_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (hobby: IHobby) => (
      <span
        className={clsx({
          'text-green-500': hobby.status === 'SHOW',
          'text-red-500': hobby.status === 'HIDE',
        })}
      >
        {hobby.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IHobby) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHobby>();

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
