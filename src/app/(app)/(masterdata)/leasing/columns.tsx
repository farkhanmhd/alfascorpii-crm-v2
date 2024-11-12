'use client';

import React from 'react';
import { ILeasing, Column } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<ILeasing>[] = [
  {
    header: 'Leasing',
    key: 'leasing_name',
    GetCellContent: (leasing: ILeasing) => leasing.leasing_name,
  },
  {
    header: 'Action',
    GetCellContent: (leasing: ILeasing) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<ILeasing>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: leasing })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: leasing.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
