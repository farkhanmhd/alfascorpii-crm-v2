import React from 'react';
import { getDealById } from '@/app/lib/data/deals';
import { IDealDetail } from '@/types';
import DealDetail from './DealDetail';

const DealDetailAsync = async ({ id }: { id: string }) => {
  const deal: IDealDetail = await getDealById(id);
  return <DealDetail {...deal} />;
};

export default DealDetailAsync;
