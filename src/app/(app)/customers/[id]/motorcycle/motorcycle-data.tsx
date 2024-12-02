import React from 'react';
import { getCustomerMotorcycle } from '@/app/lib/data/customers';
import MotorcycleForm from './motorcycle-form';

const MotorcycleData = async ({ id }: { id: string }) => {
  const motorcycle = await getCustomerMotorcycle(id);
  return <MotorcycleForm data={motorcycle} />;
};

export default MotorcycleData;
