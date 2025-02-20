import React from 'react';
import { fetchHoliday } from '@/app/lib/data/holidays';
import { SearchParamsProps } from '@/types';
import HolidayTableWrapper from './HolidayTableWrapper';

const HolidayTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchHoliday(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <HolidayTableWrapper data={data} page={page!} />;
};

export default HolidayTable;
