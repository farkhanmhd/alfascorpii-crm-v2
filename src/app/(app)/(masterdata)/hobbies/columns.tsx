'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IHobby, Column } from '@/types';

const columns: Column<IHobby>[] = [
  {
    header: 'Hobi',
    key: 'hobby_name',
    GetCellContent: (hobby: IHobby) => hobby.hobby_name,
  },
  {
    header: 'Status',
    key: 'status' as keyof IHobby,
    GetCellContent: (hobby: IHobby) => (
      <span
        className={clsx({
          'text-green-500': hobby.status === 'SHOW',
          'text-red-500': hobby.status === 'HIDE',
        })}
      >
        {hobby.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IHobby,
    GetCellContent: (hobby: IHobby) => (
      <Link
        className="text-primary hover:underline"
        href={`/customer/hobby/${hobby.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
