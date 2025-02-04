'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ICustomer } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<ICustomer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <div>
        {!row.original.user && (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customer_name',
    header: 'Nama',
  },
  {
    accessorKey: 'district',
    header: 'Kecamatan',
  },
  {
    accessorKey: 'customer_address',
    header: 'Alamat',
  },
  {
    accessorKey: 'mobile_phone',
    header: 'No Handphone',
  },
  {
    accessorKey: 'duplicate_reason',
    header: 'Alasan Duplikat',
  },
];
