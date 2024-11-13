import React, { Suspense } from 'react';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import Tablesearch from '@/components/fragments/table/tablesearch';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import AddButton from '@/components/fragments/buttons/AddButton';
import FollowUpListTable from './FollowUpListTable';

const FollowUpList = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Follow Up" />
        <AddButton>Add Follow Up</AddButton>
      </TableContainerHeader>
      <FollowUpListTable />
    </Suspense>
  );
};

export default FollowUpList;
