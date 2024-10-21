'use client';

import React from 'react';
import clsx from 'clsx';
import { IPekerjaan, Column } from '@/types';
import EditPekerjaanButton from './EditPekerjaanButton';

const columns: Column<IPekerjaan>[] = [
  {
    header: 'Pekerjaan',
    key: 'pekerjaan',
    getCellContent: (pekerjaan: IPekerjaan) => pekerjaan.pekerjaan,
  },
  {
    header: 'Kode',
    key: 'kode',
    getCellContent: (pekerjaan: IPekerjaan) => pekerjaan.kode,
  },
  {
    header: 'Status',
    key: 'status',
    getCellContent: (pekerjaan: IPekerjaan) => (
      <span
        className={clsx({
          'text-green-500': pekerjaan.status === 'SHOW',
          'text-red-500': pekerjaan.status === 'HIDE',
        })}
      >
        {pekerjaan.status}
      </span>
    ),
  },
  {
    header: 'Action',
    getCellContent: (pekerjaan: IPekerjaan) => (
      <div className="flex items-center gap-x-2">
        <EditPekerjaanButton
          id={pekerjaan.id}
          pekerjaan={pekerjaan.pekerjaan}
          kode={pekerjaan.kode}
          status={pekerjaan.status}
        />
      </div>
    ),
  },
];

export default columns;
