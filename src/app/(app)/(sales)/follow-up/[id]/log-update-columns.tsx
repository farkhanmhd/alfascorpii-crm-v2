'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ActivityLog } from '@/types';

export const columns: ColumnDef<ActivityLog>[] = [
  {
    id: 'detail',
    accessorKey: 'detail',
    header: 'Keterangan',
    cell: ({ row }) => {
      const { detail } = row.original;
      return <div className="line-clamp-1 min-w-max">{detail}</div>;
    },
  },
  {
    id: 'updated_at',
    accessorKey: 'updated_at',
    header: () => <div className="line-clamp-1 min-w-max">Waktu</div>,
    cell: ({ row }) => {
      const { updated_at: updateAt } = row.original;
      return <div className="line-clamp-1 min-w-max">{updateAt}</div>;
    },
  },
  {
    id: 'updated_by',
    accessorKey: 'updated_by',
    header: () => <div className="line-clamp-1 min-w-max">Nama CRO</div>,
    cell: ({ row }) => {
      const { updated_by: updateBy } = row.original;
      return <div className="line-clamp-1 min-w-max">{updateBy}</div>;
    },
  },
];
