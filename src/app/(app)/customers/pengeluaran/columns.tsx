'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPengeluaran, Column } from '@/types';

const columns: Column<IPengeluaran>[] = [
  {
    header: 'Batas Bawah',
    key: 'batas_bawah',
    getCellContent: (data: IPengeluaran) => data.batas_bawah,
  },
  {
    header: 'Batas Atas',
    key: 'batas_atas',
    getCellContent: (data: IPengeluaran) => data.batas_atas,
  },
  {
    header: 'Detail',
    key: 'detail',
    getCellContent: (data: IPengeluaran) => data.detail,
  },
  {
    header: 'Kode',
    key: 'kode',
    getCellContent: (data: IPengeluaran) => data.kode,
  },
  {
    header: 'Status',
    key: 'status',
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
