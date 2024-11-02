'use client';

import React from 'react';
import clsx from 'clsx';
import { IDegree, Column } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IDegree>[] = [
  {
    header: 'Kode',
    key: 'degree_code',
    GetCellContent: (data) => data.degree_code,
  },
  {
    header: 'Pendidikan',
    key: 'degree_name',
    GetCellContent: (data) => data.degree_name,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (data: IDegree) => (
      <span
        className={clsx({
          'text-green-500': data.status === 'SHOW',
          'text-red-500': data.status === 'HIDE',
        })}
      >
        {data.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (degree: IDegree) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDegree>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: degree })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: degree.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
