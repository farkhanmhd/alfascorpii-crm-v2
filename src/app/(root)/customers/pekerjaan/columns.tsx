'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPekerjaan } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IPekerjaan>[] = [
  { header: 'Pekerjaan', key: 'pekerjaan' as keyof IPekerjaan },
  { header: 'Kode', key: 'kode' as keyof IPekerjaan },
  {
    header: 'Status',
    key: 'status' as keyof IPekerjaan,
    getCellContent: (dealer: IPekerjaan) => (
      <span
        className={clsx({
          'text-green-500': dealer.status === 'SHOW',
          'text-red-500': dealer.status === 'HIDE',
        })}
      >
        {dealer.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IPekerjaan,
    getCellContent: (pekerjaan: IPekerjaan) => (
      <Link
        className="text-primary hover:underline"
        href={`/pekerjaan/${pekerjaan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
