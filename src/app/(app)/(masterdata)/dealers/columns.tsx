'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IDealer } from '@/types';
import { EditDealerDialog, DeleteDealerDialog } from './actions';

export const editableDealerColumns: ColumnDef<IDealer>[] = [
  {
    accessorKey: 'dealer_name',
    header: 'Dealer',
  },
  {
    id: 'actions',
    header: () => {
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditDealer =
        checkPermission('edit_dealers', permissions) &&
        checkPermission('view_dealers', permissions);
      const canDeleteDealer =
        checkPermission('delete_dealers', permissions) &&
        checkPermission('view_dealers', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditDealer && (
            <EditDealerDialog
              id={Number(row.original.id)}
              dealerName={row.original.dealer_name}
              dealerArea={row.original.dealer_area}
              dealerCode={row.original.dealer_code}
              dealerType={row.original.dealer_type}
            />
          )}
          {canDeleteDealer && (
            <DeleteDealerDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IDealer>[] = [
  {
    accessorKey: 'dealer_name',
    header: 'Dealer',
  },
];

export default columns;
