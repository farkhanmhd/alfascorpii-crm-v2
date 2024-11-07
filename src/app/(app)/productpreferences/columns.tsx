'use client';

import React from 'react';
import { IProductPreferences, Column } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IProductPreferences>[] = [
  {
    header: 'Product',
    key: 'product_name',
    GetCellContent: (product: IProductPreferences) => product.product_name,
  },
  {
    header: 'Action',
    GetCellContent: (leasing: IProductPreferences) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IProductPreferences>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: leasing })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: leasing.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
