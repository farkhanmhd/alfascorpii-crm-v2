import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { IMotorcycle } from '@/types';
import columns from './motorcycle-column';

const data: IMotorcycle[] | any[] = [
  {
    id: '1,',
    name: 'NMAX',
    color: 'Hitam',
    frame_number: '123456789',
    engine_number: '123456789',
    payment_method: 'Cash',
    leasing_name: 'BAF',
    purchase_date: '2022-01-01',
  },
  {
    id: '2',
    name: 'NMAX',
    color: 'Hitam',
    frame_number: '123456789',
    engine_number: '123456789',
    payment_method: 'Cash',
    leasing_name: 'BAF',
    purchase_date: '2022-01-01',
  },
];

const MotorcycleTab = () => {
  return (
    <div className="mt-6 px-4">
      <div className="rounded-md border">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default MotorcycleTab;
