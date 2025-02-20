import React from 'react';
import { fetchColors } from '@/app/lib/data/colors';
import { SearchParamsProps } from '@/types';
import ColorTableWrapper from './ColorTableWrapper';

const ColorTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchColors(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <ColorTableWrapper data={data} page={page!} />;
};

export default ColorTable;
