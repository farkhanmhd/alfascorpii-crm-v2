'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IMetodeFU } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IMetodeFU>[] = [
  { header: 'Metode', key: 'metode' as keyof IMetodeFU },
  {
    header: 'Status',
    key: 'status' as keyof IMetodeFU,
    getCellContent: (metode: IMetodeFU) => (
      <span
        className={clsx({
          'text-green-500': metode.status === 'SHOW',
          'text-red-500': metode.status === 'HIDE',
        })}
      >
        {metode.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IMetodeFU,
    getCellContent: (metode: IMetodeFU) => (
      <Link
        className="text-primary hover:underline"
        href={`/metode-fu/${metode.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
