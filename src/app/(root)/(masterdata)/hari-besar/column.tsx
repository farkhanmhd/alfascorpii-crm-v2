'use client';

import React from 'react';
import Link from 'next/link';
import { IHariBesar } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';
import clsx from 'clsx';

const columns: Column<IHariBesar>[] = [
  { header: 'Hari Besar', key: 'hari_besar' as keyof IHariBesar },
  { header: 'Tanggal', key: 'tanggal' as keyof IHariBesar },
  { header: 'Agama', key: 'agama' as keyof IHariBesar },
  { header: 'Ucapan', key: 'ucapan' as keyof IHariBesar },
  {
    header: 'Status',
    key: 'status' as keyof IHariBesar,
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
    key: 'action' as keyof IHariBesar,
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
