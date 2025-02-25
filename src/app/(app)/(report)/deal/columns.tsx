'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IDealDetail } from '@/types';

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

export const columns: ColumnDef<IDealDetail>[] = [
  ...numberColumn,
  ...baseColumns,
];
