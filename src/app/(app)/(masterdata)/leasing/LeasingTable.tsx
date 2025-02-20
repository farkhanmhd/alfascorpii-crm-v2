import React from 'react';
import { SearchParamsProps } from '@/types';
import { fetchLeasing } from '@/app/lib/data/leasing';
import LeasingTableWrapper from './LeasingTableWrapper';

const LeasingTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchLeasing(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <LeasingTableWrapper data={data} page={page!} />;
};

export default LeasingTable;
