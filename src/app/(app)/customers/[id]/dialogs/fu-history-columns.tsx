'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

export interface FollowUpHistory {
  id: string | number;
  fu_count: string;
  phone_receiver: string;
  relationship: string;
  detail: string;
  whatsapp: string;
  date: string;
}

const columns: ColumnDef<FollowUpHistory>[] = [
  {
    accessorKey: 'fu_count',
    header: 'Keterangan',
  },
  {
    accessorKey: 'phone_receiver',
    header: () => (
      <div className="line-clamp-1 min-w-max">Penerima Telepon</div>
    ),
  },
  {
    accessorKey: 'relationship',
    header: () => (
      <div className="line-clamp-1 min-w-max">Hubungan Dengan Customer</div>
    ),
  },
  {
    accessorKey: 'detail',
    header: () => (
      <div className="line-clamp-1 min-w-max">Keterangan Lainnya</div>
    ),
  },
  {
    accessorKey: 'whatsapp',
    header: 'WhatsApp',
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
  },
];

export default columns;
