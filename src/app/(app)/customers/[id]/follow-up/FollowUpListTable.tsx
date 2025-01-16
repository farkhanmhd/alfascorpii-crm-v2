import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { IFollowUp } from '@/types';
import getFollowUpList from './data';
import columns from './columns';

const FollowUpListTable = async () => {
  const followUps: IFollowUp[] = await getFollowUpList();

  return (
    <DataTable columns={columns} data={followUps} rows={followUps.length} />
  );
};

export default FollowUpListTable;
