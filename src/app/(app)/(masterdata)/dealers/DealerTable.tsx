import React from 'react';
import { fetchDealer } from '@/app/lib/data/dealers';
import { SearchParamsProps } from '@/types';
import DealerTableWrapper from './DealerTableWrapper';

const DealerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDealer(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <DealerTableWrapper data={data} page={page!} />;
};

export default DealerTable;
