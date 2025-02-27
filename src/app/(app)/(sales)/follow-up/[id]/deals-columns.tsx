'use client';

import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { UnitDeal, SparepartDeal, ServiceDeal, Photo } from '@/types';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Helper to wrap content in a styled span
const wrap = (content: React.ReactNode) => (
  <span className="line-clamp-1 min-w-max">{content}</span>
);

export const PhotoDialog: React.FC<{ photos: Photo[] }> = ({ photos }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">{wrap('View Photos')}</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle>{wrap('Foto')}</DialogTitle>
      <div className="grid gap-4">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.url}
              alt="Deal photo"
              width={400}
              height={300}
            />
          ))
        ) : (
          <span className="line-clamp-1 min-w-max">No Photos</span>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

export const unitColumns: ColumnDef<UnitDeal>[] = [
  {
    id: 'no',
    header: () => wrap('No'),
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return wrap(String(startIndex + row.index + 1) || '-');
    },
  },
  {
    accessorKey: 'call_date',
    header: () => wrap('Tanggal Call'),
    cell: ({ row }) =>
      wrap(
        row.original.call_date
          ? format(new Date(row.original.call_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'dealer',
    header: () => wrap('Dealer/Area'),
    cell: ({ row }) => wrap(row.original.dealer || '-'),
  },
  {
    accessorKey: 'deal_type',
    header: () => wrap('Tipe Deal'),
    cell: ({ row }) => wrap(row.original.deal_type || '-'),
  },
  {
    accessorKey: 'deal_customer_name',
    header: () => wrap('Nama'),
    cell: ({ row }) => wrap(row.original.deal_customer_name || '-'),
  },
  {
    accessorKey: 'deal_customer_phone',
    header: () => wrap('No Hp'),
    cell: ({ row }) => wrap(row.original.deal_customer_phone || '-'),
  },
  {
    accessorKey: 'purchase_date',
    header: () => wrap('Tanggal Pembelian'),
    cell: ({ row }) =>
      wrap(
        row.original.purchase_date
          ? format(new Date(row.original.purchase_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'motorcycle',
    header: () => wrap('Tipe Motor'),
    cell: ({ row }) => wrap(row.original.motorcycle || '-'),
  },
  {
    accessorKey: 'frame_number',
    header: () => wrap('No Rangka'),
    cell: ({ row }) => wrap(row.original.frame_number || '-'),
  },
  {
    accessorKey: 'color',
    header: () => wrap('Warna'),
    cell: ({ row }) => wrap(row.original.color || '-'),
  },
  {
    accessorKey: 'payment_method',
    header: () => wrap('Jenis Transaksi'),
    cell: ({ row }) => wrap(row.original.payment_method || '-'),
  },
  {
    accessorKey: 'leasing',
    header: () => wrap('Leasing'),
    cell: ({ row }) => wrap(row.original.leasing || '-'),
  },
  {
    accessorKey: 'relation',
    header: () => wrap('Hubungan'),
    cell: ({ row }) => wrap(row.original.relation || '-'),
  },
  {
    accessorKey: 'additional_info',
    header: () => wrap('Keterangan'),
    cell: ({ row }) => wrap(row.original.additional_info || '-'),
  },
  {
    accessorKey: 'photos',
    header: () => wrap('Foto'),
    // Custom component left unchanged
    cell: ({ row }) => <PhotoDialog photos={row.original.photos} />,
  },
];

export const serviceColumns: ColumnDef<ServiceDeal>[] = [
  {
    id: 'no',
    header: () => wrap('No'),
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return wrap(String(startIndex + row.index + 1) || '-');
    },
  },
  {
    accessorKey: 'call_date',
    header: () => wrap('Tanggal Call'),
    cell: ({ row }) =>
      wrap(
        row.original.call_date
          ? format(new Date(row.original.call_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'dealer',
    header: () => wrap('Dealer/Area'),
    cell: ({ row }) => wrap(row.original.dealer || '-'),
  },
  {
    accessorKey: 'deal_type',
    header: () => wrap('Tipe Deal'),
    cell: ({ row }) => wrap(row.original.deal_type || '-'),
  },
  {
    accessorKey: 'deal_customer_name',
    header: () => wrap('Nama'),
    cell: ({ row }) => wrap(row.original.deal_customer_name || '-'),
  },
  {
    accessorKey: 'deal_customer_phone',
    header: () => wrap('No Hp'),
    cell: ({ row }) => wrap(row.original.deal_customer_phone || '-'),
  },
  {
    accessorKey: 'service_date',
    header: () => wrap('Tanggal Service'),
    cell: ({ row }) =>
      wrap(
        row.original.service_date
          ? format(new Date(row.original.service_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'motorcycle',
    header: () => wrap('Tipe Motor'),
    cell: ({ row }) => wrap(row.original.motorcycle || '-'),
  },
  {
    accessorKey: 'frame_number',
    header: () => wrap('No Rangka'),
    cell: ({ row }) => wrap(row.original.frame_number || '-'),
  },
  {
    accessorKey: 'service_type',
    header: () => wrap('Jenis Service'),
    cell: ({ row }) => wrap(row.original.service_type || '-'),
  },
  {
    accessorKey: 'service_price',
    header: () => wrap('Nominal Service'),
    cell: ({ row }) =>
      wrap(
        row.original.service_price != null
          ? String(row.original.service_price)
          : '-'
      ),
  },
  {
    accessorKey: 'additional_info',
    header: () => wrap('Keterangan'),
    cell: ({ row }) => wrap(row.original.additional_info || '-'),
  },
  {
    accessorKey: 'photos',
    header: () => wrap('Foto'),
    cell: ({ row }) => <PhotoDialog photos={row.original.photos} />,
  },
];

export const sparepartColumns: ColumnDef<SparepartDeal>[] = [
  {
    id: 'no',
    header: () => wrap('No'),
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return wrap(String(startIndex + row.index + 1) || '-');
    },
  },
  {
    accessorKey: 'call_date',
    header: () => wrap('Tanggal Call'),
    cell: ({ row }) =>
      wrap(
        row.original.call_date
          ? format(new Date(row.original.call_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'dealer',
    header: () => wrap('Dealer/Area'),
    cell: ({ row }) => wrap(row.original.dealer || '-'),
  },
  {
    accessorKey: 'deal_customer_name',
    header: () => wrap('Nama'),
    cell: ({ row }) => wrap(row.original.deal_customer_name || '-'),
  },
  {
    accessorKey: 'deal_customer_phone',
    header: () => wrap('No Hp'),
    cell: ({ row }) => wrap(row.original.deal_customer_phone || '-'),
  },
  {
    accessorKey: 'service_date',
    header: () => wrap('Tanggal Pembelian'),
    cell: ({ row }) =>
      wrap(
        row.original.service_date
          ? format(new Date(row.original.service_date), 'dd/MM/yyyy')
          : '-'
      ),
  },
  {
    accessorKey: 'motorcycle',
    header: () => wrap('Tipe Motor'),
    cell: ({ row }) => wrap(row.original.motorcycle || '-'),
  },
  {
    accessorKey: 'frame_number',
    header: () => wrap('No Rangka'),
    cell: ({ row }) => wrap(row.original.frame_number || '-'),
  },
  {
    accessorKey: 'sparepart_price',
    header: () => wrap('Nomor Sparepart'),
    cell: ({ row }) =>
      wrap(
        row.original.sparepart_price != null
          ? String(row.original.sparepart_price)
          : '-'
      ),
  },
  {
    accessorKey: 'additional_info',
    header: () => wrap('Keterangan'),
    cell: ({ row }) => wrap(row.original.additional_info || '-'),
  },
  {
    accessorKey: 'photos',
    header: () => wrap('Foto'),
    cell: ({ row }) => <PhotoDialog photos={row.original.photos} />,
  },
];
