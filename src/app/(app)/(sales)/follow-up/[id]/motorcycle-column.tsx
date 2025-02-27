'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { ICustomerMotorcycle } from '@/types';

const columns: ColumnDef<ICustomerMotorcycle>[] = [
  {
    accessorKey: 'name',
    header: 'Type',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'color',
    header: 'Warna',
  },
  {
    accessorKey: 'frame_number',
    header: 'No.Rangka',
  },
  {
    accessorKey: 'engine_number',
    header: 'No.Mesin',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.engine_number}</div>
    ),
  },
  {
    accessorKey: 'payment_method',
    header: 'Pembelian',
  },
  {
    accessorKey: 'leasing_name',
    header: 'Leasing',
  },
  {
    id: 'production_year',
    header: () => <div className="line-clamp-1 min-w-max">Tahun Produksi</div>,
  },
  {
    accessorKey: 'purchase_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Beli</div>,
    cell: ({ row }) => {
      const date = format(parseISO(row.original.purchase_date), 'd MMMM yyyy', {
        locale: id,
      });
      return <div className="line-clamp-1 min-w-max">{date}</div>;
    },
  },
  {
    id: 'dealer',
    header: 'Dealer',
  },
];

export default columns;
