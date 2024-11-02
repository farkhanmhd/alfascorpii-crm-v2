'use client';

import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { IDealer, Column } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteDialog, useActionDialog } from '@/hooks';

const columns: Column<IDealer>[] = [
  {
    header: 'Kode',
    key: 'dealer_code',
    GetCellContent: (dealer: IDealer) => dealer.dealer_code,
  },
  {
    header: 'Nama',
    key: 'dealer_name',
    GetCellContent: (dealer: IDealer) => dealer.dealer_name,
  },
  {
    header: 'Area',
    key: 'dealer_area',
    GetCellContent: (dealer: IDealer) => dealer.dealer_area,
  },
  {
    header: 'Type',
    key: 'dealer_type',
    GetCellContent: (dealer: IDealer) => dealer.dealer_type,
  },
  {
    header: 'Action',
    GetCellContent: (dealer: IDealer) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IDealer>();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: dealer });
      };

      return (
        <div className="flex gap-x-4">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialog({ open: true, id: dealer.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
