import React from 'react';
import { fetchMotorcycles } from '@/app/lib/data/motorcycles';
import { SearchParamsProps } from '@/types';
import MotorcyclesTableWrapper from './MotorcyclesTableWrapper';

const MotorcyclesTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchMotorcycles(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <MotorcyclesTableWrapper data={data} page={page!} />;
};

export default MotorcyclesTable;
