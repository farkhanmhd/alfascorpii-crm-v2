'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IDealDetail } from '@/types';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

export const columns: ColumnDef<IDealDetail>[] = [
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

  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
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
  {
    id: 'call_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Call</div>,
    accessorKey: 'call_date',
  },
  {
    id: 'cro',
    header: 'CRO',
    accessorKey: 'user',
  },
  {
    id: 'dealer',
    header: 'Dealer',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.dealer}</div>
    ),
  },
  {
    id: 'deal_type',
    header: () => <div className="line-clamp-1 min-w-max">Tipe Deal</div>,
    cell: ({ row }) => <div>{row.original.deal_type}</div>,
  },
  {
    id: 'customer_name',
    header: () => <div className="line-clamp-1 min-w-max">Nama Konsumen</div>,
    accessorKey: 'deal_customer_name',
  },
  {
    id: 'purchase_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Beli</div>,
    accessorKey: 'purchase_date',
  },
  {
    id: 'motorcycle',
    header: () => <div className="line-clamp-1 min-w-max">Sepeda Motor</div>,
    accessorKey: 'motorcycle',
  },
];
