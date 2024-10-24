'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IHariBesar, Column } from '@/types';

const columns: Column<IHariBesar>[] = [
  {
    header: 'Hari Besar',
    key: 'hari_besar',
    getCellContent: (item) => item.hari_besar,
  },
  { header: 'Tanggal', key: 'tanggal', getCellContent: (item) => item.tanggal },
  { header: 'Agama', key: 'agama', getCellContent: (item) => item.agama },
  { header: 'Ucapan', key: 'ucapan', getCellContent: (item) => item.ucapan },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (hari: IHariBesar) => (
      <span
        className={clsx({
          'text-green-500': hari.status === 'AKTIF',
          'text-red-500': hari.status === 'HOLD',
        })}
      >
        {hari.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (hari: IHariBesar) => (
      <Link
        className="text-primary hover:underline"
        href={`/hari-besar/${hari.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
