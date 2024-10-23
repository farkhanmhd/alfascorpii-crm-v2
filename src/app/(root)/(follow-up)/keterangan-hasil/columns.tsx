'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IKeteranganHasil, Column } from '@/types';

const columns: Column<IKeteranganHasil>[] = [
  {
    header: 'Status Follow UP',
    key: 'status_fu',
    getCellContent: (keterangan: IKeteranganHasil) => (
      <span
        className={clsx({
          'text-green-500': keterangan.status_fu === 'CONTACTED',
          'text-red-500': keterangan.status_fu === 'NOT CONTACTED',
        })}
      >
        {keterangan.status_fu}
      </span>
    ),
  },
  {
    header: 'Keterangan Hasil',
    key: 'keterangan_hasil',
    getCellContent: (keterangan: IKeteranganHasil) => (
      <span
        className={clsx({
          'text-red-400': keterangan.keterangan_hasil === 'NOT CONTACTED',
          'text-red-500': keterangan.keterangan_hasil === 'TIDAK BERMINAT',
          'text-red-700': keterangan.keterangan_hasil === 'TIDAK BERTEMU',
          'text-primary': keterangan.keterangan_hasil === 'PROSPECT',
          'text-green-500': keterangan.keterangan_hasil === 'MINAT',
        })}
      >
        {keterangan.keterangan_hasil}
      </span>
    ),
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (keterangan: IKeteranganHasil) => (
      <span
        className={clsx({
          'text-green-500': keterangan.status === 'SHOW',
          'text-red-500': keterangan.status === 'HIDE',
        })}
      >
        {keterangan.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (keterangan: IKeteranganHasil) => (
      <Link
        className="text-primary hover:underline"
        href={`/keterangan-hasil/${keterangan.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
