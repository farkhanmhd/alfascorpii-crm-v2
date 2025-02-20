import React, { Suspense } from 'react';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import FollowUpListTable from './FollowUpListTable';

const FollowUpList = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <FollowUpListTable />
    </Suspense>
  );
};

export default FollowUpList;
