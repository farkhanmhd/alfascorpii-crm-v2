'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { checkPermission } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { ICustomer } from '@/types';
import { usePermissions } from '@/hooks';

const checkBoxColumn: ColumnDef<ICustomer>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const { permissions } = usePermissions();
      const canAssign = checkPermission(
        'sales_duplicate_data_assign_to_cro',
        permissions
      );

      if (!canAssign) return null;

      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canAssign = checkPermission(
        'sales_duplicate_data_assign_to_cro',
        permissions
      );

      if (!canAssign) return null;

      return (
        <div>
          {!row.original.user && (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

const baseColumns: ColumnDef<ICustomer>[] = [
  {
    id: 'no',
    header: () => <div className="line-clamp-1 min-w-max">No</div>,
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return (
        <div className="line-clamp-1 min-w-max">
          {startIndex + row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: 'customer_name',
    header: () => <div className="line-clamp-1 min-w-max">Nama</div>,

    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.customer_name}</div>
    ),
  },
  {
    accessorKey: 'district',
    header: () => <div className="line-clamp-1 min-w-max">Kecamatan</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.getValue('district')}</div>
    ),
  },
  {
    accessorKey: 'customer_address',
    header: () => <div className="line-clamp-1 min-w-max">Alamat</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.getValue('customer_address')}
      </div>
    ),
  },
  {
    accessorKey: 'mobile_phone',
    header: () => <div className="line-clamp-1 min-w-max">No Handphone</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.getValue('mobile_phone')}
      </div>
    ),
  },
  {
    accessorKey: 'duplicate_reason',
    header: () => <div className="line-clamp-1 min-w-max">Alasan Duplikat</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.getValue('duplicate_reason')}
      </div>
    ),
  },
];

export const assignableColumn: ColumnDef<ICustomer>[] = [
  ...checkBoxColumn,
  ...baseColumns,
];

export const columns: ColumnDef<ICustomer>[] = [...baseColumns];
