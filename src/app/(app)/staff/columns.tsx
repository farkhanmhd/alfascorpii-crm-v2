'use client';

import React from 'react';
import clsx from 'clsx';
import { Link } from 'next-view-transitions';
import { IStaff, Column } from '@/types';

const columns: Column<IStaff>[] = [
  { header: 'NIP', key: 'nip', GetCellContent: (staff: IStaff) => staff.nip },
  {
    header: 'Username',
    key: 'username',
    GetCellContent: (staff: IStaff) => staff.username,
  },
  {
    header: 'Name',
    key: 'name',
    GetCellContent: (staff: IStaff) => staff.name,
  },
  {
    header: 'Email',
    key: 'email',
    GetCellContent: (staff: IStaff) => staff.email,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (staff: IStaff) => (
      <span
        className={clsx({
          'text-green-500': staff.status === 'VALID',
          'text-yellow-500': staff.status === 'SUSPEND',
          'text-red-500': staff.status === 'RESIGN',
        })}
      >
        {staff.status}
      </span>
    ),
  },
  {
    header: 'Role',
    key: 'role',
    GetCellContent: (staff: IStaff) => staff.role,
  },
  {
    header: 'Action',
    GetCellContent: (staff: IStaff) => (
      <Link
        className="text-primary hover:underline"
        href={`/staff/${staff.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
