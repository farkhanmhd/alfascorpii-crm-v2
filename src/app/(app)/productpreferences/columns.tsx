'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IProductPreferences, Column } from '@/types';

const columns: Column<IProductPreferences>[] = [
  {
    header: 'Product',
    key: 'product_name',
    GetCellContent: (product: IProductPreferences) => product.product_name,
  },
  {
    header: 'Action',
    GetCellContent: (product: IProductPreferences) => (
      <Link
        className="text-primary hover:underline"
        href={`/productpreferences/${product.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
