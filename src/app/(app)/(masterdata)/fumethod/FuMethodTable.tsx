import React from 'react';
import { fetchFuMethod } from '@/app/lib/data/fumethod';
import { SearchParamsProps } from '@/types';
import FuMethodTableWrapper from './FuMethodTableWrapper';

const FuMethodTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchFuMethod(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <FuMethodTableWrapper data={data} page={page!} />;
};

export default FuMethodTable;
