'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPenghasilan, Column } from '@/types';

const columns: Column<IPenghasilan>[] = [
  {
    header: 'Batas Bawah',
    key: 'batas_bawah',
    getCellContent: (data: IPenghasilan) => data.batas_bawah,
  },
  {
    header: 'Batas Atas',
    key: 'batas_atas',
    getCellContent: (data: IPenghasilan) => data.batas_atas,
  },
  {
    header: 'Detail',
    key: 'detail',
    getCellContent: (data: IPenghasilan) => data.detail,
  },
  {
    header: 'Kode',
    key: 'kode',
    getCellContent: (data: IPenghasilan) => data.kode,
  },
  {
    header: 'Status',
    key: 'status',
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
