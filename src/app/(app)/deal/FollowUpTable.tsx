import React from 'react';
import { fetchDeals } from '@/app/lib/data/deals';
import { columns } from './columns';
import FollowUpTableData from './FollowUpTableData';

const FollowUpTable = async ({ ...params }: any) => {
  const { deals, lastPage: totalPages, total, page } = await fetchDeals(params);

  return (
    <FollowUpTableData
      columns={columns}
      data={deals}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default FollowUpTable;
