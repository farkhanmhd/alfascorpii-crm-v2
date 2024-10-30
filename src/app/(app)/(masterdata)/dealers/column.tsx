'use client';

import React from 'react';
import Link from 'next/link';
import { IDealer, Column } from '@/types';

const columns: Column<IDealer>[] = [
  {
    header: 'Kode',
    key: 'dealer_code',
    getCellContent: (dealer: IDealer) => dealer.dealer_code,
  },
  {
    header: 'Nama',
    key: 'dealer_name',
    getCellContent: (dealer: IDealer) => dealer.dealer_name,
  },
  {
    header: 'Area',
    key: 'dealer_area',
    getCellContent: (dealer: IDealer) => dealer.dealer_area,
  },
  {
    header: 'Type',
    key: 'dealer_type',
    getCellContent: (dealer: IDealer) => dealer.dealer_type,
  },
  {
    header: 'Action',
    getCellContent: (dealer: IDealer) => (
      <Link
        className="text-primary hover:underline"
        href={`/dealer/${dealer.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
