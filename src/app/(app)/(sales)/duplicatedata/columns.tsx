'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { cn, checkPermission } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { buttonVariants } from '@/components/ui/button';
import { ICustomer } from '@/types';
import { Pencil } from 'lucide-react';
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

export const viewableColumn: ColumnDef<ICustomer>[] = [
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canViewDetails =
        checkPermission('view_sales', permissions) &&
        checkPermission('view_sales_follow_up', permissions) &&
        checkPermission('sales_fu_view_detail_customer_data', permissions);

      if (!canViewDetails) return null;

      return (
        <div className="flex justify-end gap-x-4">
          <Link
            href={`/customers/${row.original.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'icon',
              })
            )}
          >
            <Pencil />
          </Link>
        </div>
      );
    },
  },
  ...baseColumns,
];

export const assignableColumn: ColumnDef<ICustomer>[] = [
  ...checkBoxColumn,
  ...viewableColumn,
];

export const columns: ColumnDef<ICustomer>[] = [...baseColumns];
