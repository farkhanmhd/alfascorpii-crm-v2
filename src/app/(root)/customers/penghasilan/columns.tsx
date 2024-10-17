'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPenghasilan } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IPenghasilan>[] = [
  { header: 'Batas Bawah', key: 'batas_bawah' as keyof IPenghasilan },
  { header: 'Batas Atas', key: 'batas_atas' as keyof IPenghasilan },
  { header: 'Detail', key: 'detail' as keyof IPenghasilan },
  { header: 'Kode', key: 'kode' as keyof IPenghasilan },
  {
    header: 'Status',
    key: 'status' as keyof IPenghasilan,
    getCellContent: (pengeluaran: IPenghasilan) => (
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
    key: 'action' as keyof IPenghasilan,
    getCellContent: (pengeluaran: IPenghasilan) => (
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
