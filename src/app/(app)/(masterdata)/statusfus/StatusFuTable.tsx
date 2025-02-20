import React from 'react';
import { fetchStatusFU } from '@/app/lib/data/statusfus';
import { SearchParamsProps } from '@/types';
import StatusFuTableWrapper from './StatusFuTableWrapper';

const StatusFuTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchStatusFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <StatusFuTableWrapper data={data} page={page!} />;
};

export default StatusFuTable;
