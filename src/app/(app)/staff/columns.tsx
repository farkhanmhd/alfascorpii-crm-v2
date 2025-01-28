'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { IStaff } from '@/types';
import { cn } from '@/lib/utils';

const columns: ColumnDef<IStaff>[] = [
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
    id: 'nip',
    header: 'NIP',
    cell: () => <span>123456</span>,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <span>{row.getValue('username')}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    id: 'phone',
    header: () => <span className="line-clamp-1 min-w-max">Nomor Hp</span>,
    cell: () => <span>123456</span>,
  },
  {
    id: 'dealer',
    header: () => <span className="line-clamp-1 min-w-max">Dealer / Area</span>,
    cell: () => <span>Main Dealer Medan</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={cn('font-semibold uppercase', {
          'text-green-500': row.getValue('status') === 'active',
          'text-red-500': row.getValue('status') !== 'active',
        })}
      >
        {row.getValue('status')}
      </span>
    ),
  },
  {
    id: 'action',
    header: 'Aksi',
    cell: ({ row }) => (
      <Link
        href={`/staff/${row.original.uuid}`}
        className="text-blue-600 duration-200 hover:underline"
      >
        Detail
      </Link>
    ),
  },
];

export default columns;

// ponsel
// dealer/area
// aksi
