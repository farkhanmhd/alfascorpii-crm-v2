import React from 'react';
import { fetchHobi } from '@/app/lib/data/hobbies';
import { SearchParamsProps } from '@/types';
import HobbiesTableWrapper from './HobbiesTableWrapper';

const HobbiesTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchHobi(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <HobbiesTableWrapper data={data} page={page!} />;
};

export default HobbiesTable;
