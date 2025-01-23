'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { IDealer } from '@/types';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks';
import { EditDealerDialog, DeleteDealerDialog } from './actions';

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
      const { permissions } = usePermissions();

      return (
        <div className="flex justify-end gap-x-4">
          {permissions.includes('edit_dealers') && (
            <EditDealerDialog
              id={Number(row.original.id)}
              dealerArea={row.original.dealer_area}
              dealerCode={row.original.dealer_code}
              dealerName={row.original.dealer_name}
              dealerType={row.original.dealer_type}
            />
          )}
          {permissions.includes('delete_dealers') && (
            <DeleteDealerDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export default columns;
