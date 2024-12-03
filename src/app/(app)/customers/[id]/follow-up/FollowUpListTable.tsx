import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { IFollowUp } from '@/types';
import getFollowUpList from './data';
import columns from './columns';

const FollowUpListTable = async () => {
  const followUps: IFollowUp[] = await getFollowUpList();

  return (
    <DataTable
      columns={columns}
      data={followUps}
      addLabel="Tambah Follow Up"
      searchPlaceholder="Cari Follow Up"
      totalPages={1}
      rows={followUps.length}
      currentPage={1}
    />
  );
};

export default FollowUpListTable;
