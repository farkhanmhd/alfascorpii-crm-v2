'use client';

import React from 'react';
import Link from 'next/link';
import { ILeasing } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<ILeasing>[] = [
  { header: 'Leasing', key: 'nama' as keyof ILeasing },
  {
    header: 'Action',
    key: 'action' as keyof ILeasing,
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
