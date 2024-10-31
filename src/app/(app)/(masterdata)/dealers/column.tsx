'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash } from 'lucide-react';
import { IDealer, Column } from '@/types';
import { Button } from '@/components/ui/button';

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
    GetCellContent: (job: IDealer) => {
      const { push } = useRouter();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => push(`/dealers/${job.id}`)}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => push(`/dealers/${job.id}?remove=true`)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
