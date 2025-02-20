import React from 'react';
import { fetchDeals } from '@/app/lib/data/deals';
import DealTableWrapper from './DealTableWrapper';

const DealTable = async (params: any) => {
  const { deals, lastPage: totalPages, total } = await fetchDeals(params);

  if (!deals) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return (
    <DealTableWrapper
      data={deals}
      page={params.page}
      rows={total}
      totalPages={totalPages}
    />
  );
};

export default DealTable;
