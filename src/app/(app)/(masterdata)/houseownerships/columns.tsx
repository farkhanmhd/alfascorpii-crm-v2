'use client';

import React from 'react';
import clsx from 'clsx';
import { IHouseOwnership, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IHouseOwnership>[] = [
  {
    header: 'Status Rumah',
    key: 'house_ownership_status',
    GetCellContent: (data: IHouseOwnership) => data.house_ownership_status,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (statusRumah: IHouseOwnership) => (
      <span
        className={clsx({
          'text-green-500': statusRumah.status === 'SHOW',
          'text-red-500': statusRumah.status === 'HIDE',
        })}
      >
        {statusRumah.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IHouseOwnership) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHouseOwnership>();

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
