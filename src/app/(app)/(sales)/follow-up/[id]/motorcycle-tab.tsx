'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { ICustomerMotorcycle } from '@/types';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import columns from './motorcycle-column';

type Props = {
  motorcycles: ICustomerMotorcycle[];
};

const MotorcycleTab = ({ motorcycles }: Props) => {
  const { state } = useSidebar();
  return (
    <div className="mb-8">
      <div
        className={cn(
          'max-h-[800px] max-w-[calc(100svw-96px)] rounded-md bg-white shadow-sm',
          {
            'md:max-w-[calc(100svw-354px)]': state === 'expanded',
            'md:max-w-[calc(100svw-144px)]': state === 'collapsed',
          }
        )}
      >
        <DataTable columns={columns} data={motorcycles} />
      </div>
    </div>
  );
};

export default MotorcycleTab;
