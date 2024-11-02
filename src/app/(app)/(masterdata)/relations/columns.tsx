'use client';

import React from 'react';
import clsx from 'clsx';
import { IRelation, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IRelation>[] = [
  {
    header: 'Kerabat',
    key: 'relation_name',
    GetCellContent: (relation: IRelation) => relation.relation_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (relation: IRelation) => (
      <span
        className={clsx({
          'text-green-500': relation.status === 'SHOW',
          'text-red-500': relation.status === 'HIDE',
        })}
      >
        {relation.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IRelation) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IRelation>();

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
