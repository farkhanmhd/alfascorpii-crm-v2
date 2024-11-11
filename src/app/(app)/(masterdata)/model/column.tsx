'use client';

import React from 'react';
import { Link } from 'next-view-transitions';
import { IDpackModel, Column } from '@/types';

const columns: Column<IDpackModel>[] = [
  { header: 'Model', key: 'model', GetCellContent: (model) => model.model },
  {
    header: 'Catalog',
    key: 'catalog',
    GetCellContent: (model) => model.catalog,
  },
  {
    header: 'Category',
    key: 'category',
    GetCellContent: (model) => model.category,
  },
  { header: 'Color', key: 'color', GetCellContent: (model) => model.color },
  {
    header: 'Action',
    GetCellContent: (model: IDpackModel) => (
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
