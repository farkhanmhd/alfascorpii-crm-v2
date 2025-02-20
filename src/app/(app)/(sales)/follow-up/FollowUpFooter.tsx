'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import DataTablePagination from '@/components/elements/table/pagination';
import FollowUpDialogs from './FollowUpDialogs';
import {
  useFuUsers,
  useFuSelection,
  useFuTotalPage,
} from './FollowUpTableData';

const FollowUpFooter = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const { fuSelection } = useFuSelection();
  const { fuUsers } = useFuUsers();
  const { totalData } = useFuTotalPage();
  return (
    <>
      <FollowUpDialogs rowSelection={fuSelection} users={fuUsers} />
      <DataTablePagination
        selectedRows={Object.keys(fuSelection).length}
        currentPage={Number(currentPage)}
        totalPages={totalData.totalData}
        total={totalData.total}
      />
    </>
  );
};

export default FollowUpFooter;
