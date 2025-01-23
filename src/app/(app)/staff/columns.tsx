'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IStaff } from '@/types';

const columns: ColumnDef<IStaff>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <span>{row.getValue('username')}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span>{row.getValue('status')}</span>,
  },
];

export default columns;
