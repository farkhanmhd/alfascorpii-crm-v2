'use client';

import React from 'react';
import Link from 'next/link';
import { ILeasing, Column } from '@/types';

const columns: Column<ILeasing>[] = [
  {
    header: 'Leasing',
    key: 'nama',
    getCellContent: (leasing: ILeasing) => leasing.nama,
  },
  {
    header: 'Action',
    getCellContent: (leasing: ILeasing) => (
      <Link
        className="text-primary hover:underline"
        href={`/leasing/${leasing.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
