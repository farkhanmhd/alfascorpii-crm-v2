'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { checkPermission, cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IDealDetail } from '@/types';
import { Pencil } from 'lucide-react';
import { usePermissions } from '@/hooks';

const baseColumns: ColumnDef<IDealDetail>[] = [
  {
    id: 'deal_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Call</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.call_date}</div>
    ),
  },
  {
    id: 'deal_type',
    header: () => <div className="line-clamp-1 min-w-max">CRO</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.user}</div>
    ),
  },
  {
    id: 'dealer_name',
    header: () => <div className="line-clamp-1 min-w-max">Dealer</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.dealer}</div>
    ),
  },
  {
    id: 'deal_type',
    header: () => <div className="line-clamp-1 min-w-max">Tipe Deal</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.deal_type}</div>
    ),
  },

  {
    id: 'customer_name',
    header: () => <div className="line-clamp-1 min-w-max">Customer</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.deal_customer_name}
      </div>
    ),
  },
  {
    id: 'purchase_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Beli</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.purchase_date}</div>
    ),
  },
  {
    id: 'motorcycle',
    header: () => <div className="line-clamp-1 min-w-max">Tipe Motor</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.motorcycle}</div>
    ),
  },
];

export const numberColumn: ColumnDef<IDealDetail>[] = [
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
];

export const viewableColumn: ColumnDef<IDealDetail>[] = [
  ...numberColumn,
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canViewDetails = checkPermission('view_detail_deal', permissions);

      if (!canViewDetails) return null;
      return (
        <div className="flex justify-center gap-x-4">
          <Link
            href={`/deal/${row.original.id}`}
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

export const columns: ColumnDef<IDealDetail>[] = [
  ...numberColumn,
  ...baseColumns,
];
