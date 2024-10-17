'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IPendidikan } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IPendidikan>[] = [
  { header: 'Pendidikan', key: 'pendidikan' as keyof IPendidikan },
  { header: 'Kode', key: 'kode' as keyof IPendidikan },
  {
    header: 'Status',
    key: 'status' as keyof IPendidikan,
    getCellContent: (dealer: IPendidikan) => (
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
    key: 'action' as keyof IPendidikan,
    getCellContent: (pendidikan: IPendidikan) => (
      <Link
        className="text-primary hover:underline"
        href={`/pendidikan/${pendidikan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
