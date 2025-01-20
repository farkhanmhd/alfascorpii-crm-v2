'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { IDealer } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog, usePermissions } from '@/hooks';

const columns: ColumnDef<IDealer>[] = [
  {
    accessorKey: 'dealer_code',
    header: 'Kode',
  },
  {
    accessorKey: 'dealer_name',
    header: 'Nama',
  },
  {
    accessorKey: 'dealer_area',
    header: 'Area',
  },
  {
    accessorKey: 'dealer_type',
    header: 'Type',
  },
  {
    id: 'action',
    header: () => {
      const { permissions } = usePermissions();

      if (
        !permissions.includes('edit_dealers') &&
        !permissions.includes('delete_dealers')
      ) {
        return null;
      }

      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDealer>();
      const { permissions } = usePermissions();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: row.original });
      };

      return (
        <div className="flex justify-end gap-x-4">
          {permissions.includes('edit_dealers') && (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Pencil />
            </Button>
          )}
          {permissions.includes('delete_dealers') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDeleteDialog({ open: true, id: row.original.id })
              }
            >
              <Trash />
            </Button>
          )}
        </div>
      );
    },
  },
];

export default columns;
