import React from 'react';
import { fetchFuResult } from '@/app/lib/data/furesult';
import { SearchParamsProps } from '@/types';
import FuResultTableWrapper from './FuResultTableWrapper';

const FuResultTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuResult(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <FuResultTableWrapper data={data} page={page!} />;
};

export default FuResultTable;
