import React from 'react';
import { fetchincome } from '@/app/lib/data/incomes';
import { SearchParamsProps } from '@/types';
import IncomeTableWrapper from './IncomeTableWrapper';

const IncomeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchincome(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <IncomeTableWrapper data={data} page={page!} />;
};

export default IncomeTable;
