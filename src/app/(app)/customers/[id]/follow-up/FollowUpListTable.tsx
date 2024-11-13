import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import DataTablePagination from '@/components/fragments/table/pagination';
import { IFollowUp } from '@/types';
import getFollowUpList from './data';
import columns from './columns';

const FollowUpListTable = async () => {
  const followUps: IFollowUp[] = await getFollowUpList();

  return (
    <>
      <DataTable columns={columns} data={followUps} />
      <DataTablePagination currentPage={1} totalPages={1} />
    </>
  );
};

export default FollowUpListTable;
