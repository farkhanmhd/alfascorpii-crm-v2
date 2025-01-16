import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { ICustomerMotorcycle } from '@/types';
import columns from './motorcycle-column';

type Props = {
  motorcycles: ICustomerMotorcycle[];
};

const MotorcycleTab = ({ motorcycles }: Props) => {
  return (
    <div className="mb-8">
      <div className="rounded-md border">
        <DataTable columns={columns} data={motorcycles} />
      </div>
    </div>
  );
};

export default MotorcycleTab;
