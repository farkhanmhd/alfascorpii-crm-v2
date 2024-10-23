'use client';

import React from 'react';
import Link from 'next/link';
import { IDpackModel, Column } from '@/types';

const columns: Column<IDpackModel>[] = [
  { header: 'Model', key: 'model', getCellContent: (model) => model.model },
  {
    header: 'Catalog',
    key: 'catalog',
    getCellContent: (model) => model.catalog,
  },
  {
    header: 'Category',
    key: 'category',
    getCellContent: (model) => model.category,
  },
  { header: 'Color', key: 'color', getCellContent: (model) => model.color },
  {
    header: 'Action',
    getCellContent: (model: IDpackModel) => (
      <Link
        className="text-primary hover:underline"
        href={`/model/${model.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
