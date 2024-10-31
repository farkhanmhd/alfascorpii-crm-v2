'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IRelation, Column } from '@/types';

const columns: Column<IRelation>[] = [
  {
    header: 'Kerabat',
    key: 'relation_name',
    GetCellContent: (relation: IRelation) => relation.relation_name,
  },
  {
    header: 'Status',
    key: 'status' as keyof IRelation,
    GetCellContent: (relation: IRelation) => (
      <span
        className={clsx({
          'text-green-500': relation.status === 'SHOW',
          'text-red-500': relation.status === 'HIDE',
        })}
      >
        {relation.status}
      </span>
    ),
  },
  {
    header: 'Action',
    key: 'action' as keyof IRelation,
    GetCellContent: (customer: IRelation) => (
      <Link
        className="text-primary hover:underline"
        href={`/customers/relations/${customer.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
