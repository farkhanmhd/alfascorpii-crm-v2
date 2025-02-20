'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { checkPermission, cn } from '@/lib/utils';
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

      const canAssign = checkPermission('sales_fu_assign_to_cro', permissions);

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

      const canAssign = checkPermission('sales_fu_assign_to_cro', permissions);

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

const indexColumn: ColumnDef<ICustomer>[] = [
  {
    id: 'no',
    header: 'No',
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return <div>{startIndex + row.index + 1}</div>;
    },
  },
];

const baseColumns: ColumnDef<ICustomer>[] = [
  {
    id: 'assign-date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Assign</div>,
    cell: ({ row }) => {
      const assignedDate = row.original.assigned_date;
      return <div className="line-clamp-1 min-w-max">{assignedDate}</div>;
    },
  },
  {
    accessorKey: 'mobile_phone',
    header: 'NO. HP',
  },
  {
    accessorKey: 'user',
    header: () => <div className="line-clamp-1 min-w-max">Nama CRO</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.user}</div>
    ),
  },
  {
    id: 'fu-status',
    header: () => <div className="line-clamp-1 min-w-max">Status FU</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.follow_up_status}
      </div>
    ),
  },
  {
    id: 'fu_result',
    header: () => <div className="line-clamp-1 min-w-max">Hasil FU</div>,
  },
  {
    id: 'fu-detail',
    header: () => <div className="line-clamp-1 min-w-max">Keterangan FU</div>,
    cell: ({ row }) => {
      const followUpRow = row.original.follow_up;
      const followUpDetail =
        followUpRow.length > 0
          ? followUpRow[followUpRow.length - 1].follow_up_detail
          : '';
      return <div className="line-clamp-1 min-w-max">{followUpDetail}</div>;
    },
  },
  {
    accessorKey: 'nik',
    header: 'NIK',
  },
  {
    accessorKey: 'customer_name',
    header: 'Nama',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.customer_name}</div>
    ),
  },
  {
    id: 'purchase_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Beli</div>,
    cell: ({ row }) => {
      return <div>{row.original.motorcycles[0].purchase_date}</div>;
    },
  },
  {
    id: 'dealer_area',
    header: () => <div className="line-clamp-1 min-w-max">Dealer / Area</div>,
    cell: ({ row }) => {
      const motorcycle = row.original.motorcycles;
      const dealer = motorcycle[motorcycle.length - 1].dealer_name;
      return <div className="line-clamp-1 min-w-max">{dealer}</div>;
    },
  },
  {
    id: 'frame_number',
    header: () => <div className="line-clamp-1 min-w-max">Nomor Rangka</div>,
    cell: ({ row }) => {
      return <div>{row.original.motorcycles[0].frame_number}</div>;
    },
  },
  {
    id: 'motorcycle_type',
    header: () => <div className="line-clamp-1 min-w-max">Tipe Motor</div>,
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 min-w-max">
          {row.original.motorcycles[0].name}
        </div>
      );
    },
  },
];

const actionColumn: ColumnDef<ICustomer>[] = [
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const requiredPermission =
        checkPermission(
          'sales_customer_view_detail_customer_data',
          permissions
        ) || checkPermission('sales_fu_view_detail_customer_data', permissions);

      if (!requiredPermission) return null;

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
];

export const assignableColumn: ColumnDef<ICustomer>[] = [
  ...checkBoxColumn,
  ...indexColumn,
  ...actionColumn,
  ...baseColumns,
];

export const columns: ColumnDef<ICustomer>[] = [...indexColumn, ...baseColumns];
