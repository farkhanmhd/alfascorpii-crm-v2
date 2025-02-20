import React from 'react';
import { fetchDetailFU } from '@/app/lib/data/detailfu';
import { SearchParamsProps } from '@/types';
import FuDetailTableWrapper from './FuDetailTableWrapper';

const FuDetailTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDetailFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <FuDetailTableWrapper data={data} page={page!} />;
};

export default FuDetailTable;
