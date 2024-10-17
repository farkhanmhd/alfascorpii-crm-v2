'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IKeteranganFU } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IKeteranganFU>[] = [
  { header: 'Keterangan', key: 'keterangan' as keyof IKeteranganFU },
  { header: 'Kategori Hasil', key: 'kategori_hasil' as keyof IKeteranganFU },
  {
    header: 'Status',
    key: 'status' as keyof IKeteranganFU,
    getCellContent: (keterangan: IKeteranganFU) => (
      <span
        className={clsx({
          'text-green-500': keterangan.status === 'CONTACTED',
          'text-red-500': keterangan.status === 'NOT CONTACTED',
        })}
      >
        {keterangan.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IKeteranganFU,
    getCellContent: (keterangan: IKeteranganFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/keterangan-fu/${keterangan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
