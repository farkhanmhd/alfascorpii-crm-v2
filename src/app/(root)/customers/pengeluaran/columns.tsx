'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPengeluaran } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IPengeluaran>[] = [
  { header: 'Batas Bawah', key: 'batas_bawah' as keyof IPengeluaran },
  { header: 'Batas Atas', key: 'batas_atas' as keyof IPengeluaran },
  { header: 'Detail', key: 'detail' as keyof IPengeluaran },
  { header: 'Kode', key: 'kode' as keyof IPengeluaran },
  {
    header: 'Status',
    key: 'status' as keyof IPengeluaran,
    getCellContent: (pengeluaran: IPengeluaran) => (
      <span
        className={clsx({
          'text-green-500': pengeluaran.status === 'SHOW',
          'text-red-500': pengeluaran.status === 'HIDE',
        })}
      >
        {pengeluaran.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IPengeluaran,
    getCellContent: (pengeluaran: IPengeluaran) => (
      <Link
        className="text-primary hover:underline"
        href={`/pengeluaran/${pengeluaran.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
