'use client';

import React from 'react';
import Link from 'next/link';
import { IDpackModel } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IDpackModel>[] = [
  { header: 'Model', key: 'model' as keyof IDpackModel },
  { header: 'Catalog', key: 'catalog' as keyof IDpackModel },
  { header: 'Category', key: 'category' as keyof IDpackModel },
  { header: 'Color', key: 'color' as keyof IDpackModel },
  {
    header: 'Action',
    key: 'action' as keyof IDpackModel,
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
