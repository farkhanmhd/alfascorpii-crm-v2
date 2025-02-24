'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import type { ICustomerFollowUp } from '@/types';

const columns: ColumnDef<ICustomerFollowUp>[] = [
  {
    id: 'status',
    header: () => <div className="line-clamp-1 min-w-max">Status</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.status || <div className="text-center">-</div>}
      </div>
    ),
  },
  {
    id: 'user',
    header: () => <div className="line-clamp-1 min-w-max">CRO</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.user || <div className="text-center">-</div>}
      </div>
    ),
  },
  {
    id: 'recipient',
    header: () => (
      <div className="line-clamp-1 min-w-max">Penerima Telepon</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.recipient}</div>
    ),
  },
  {
    id: 'relationship',
    header: () => (
      <div className="line-clamp-1 min-w-max">Hubungan Dengan Customer</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.relationship || <div className="text-center">-</div>}
      </div>
    ),
  },
  {
    id: 'additional_information',
    header: () => (
      <div className="line-clamp-1 min-w-max">Keterangan Lainnya</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.additional_information || (
          <div className="text-center">-</div>
        )}
      </div>
    ),
  },
  {
    id: 'whatsapp_number',
    header: () => <div className="line-clamp-1 min-w-max">Whatsapp</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.whatsapp_number || <div className="text-center">-</div>}
      </div>
    ),
  },
  {
    id: 'follow_up_date',
    header: 'Tanggal',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.follow_up_date}
      </div>
    ),
  },
  {
    id: 'follow_up_method',
    header: () => (
      <div className="line-clamp-1 min-w-max">Metode Follow Up</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.follow_up_method}
      </div>
    ),
  },
  {
    id: 'follow_up_status',
    header: () => (
      <div className="line-clamp-1 min-w-max">Status Follow Up</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.follow_up_status}
      </div>
    ),
  },
  {
    id: 'follow_up_detail',
    header: () => (
      <div className="line-clamp-1 min-w-max">Keterangan Follow UP</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.follow_up_detail || <div className="text-center">-</div>}
      </div>
    ),
  },
  {
    id: 'product_preferences',
    header: () => <div className="line-clamp-1 min-w-max">Minat Product</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.product_preferences || (
          <div className="text-center">-</div>
        )}
      </div>
    ),
  },
  {
    id: 'follow_up_result',
    header: () => <div className="line-clamp-1 min-w-max">Hasil</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max text-center">
        {row.original.follow_up_result || <div className="text-center">-</div>}
      </div>
    ),
  },
];

export default columns;
