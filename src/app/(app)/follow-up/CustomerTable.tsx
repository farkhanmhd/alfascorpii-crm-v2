import React from 'react';
import CustomTabs from '@/components/fragments/tabs/customtab';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getFollowUps } from '@/app/lib/data/follow-up';
import { SearchParamsProps } from '@/types';
import { columns } from './columns';
import { TabData } from '@/types';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    followupqueue,
    duplicated_data,
    last_page: totalPages,
    current_page: currentPage,
    total,
  } = await getFollowUps(search, page, perPage);
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Queue',
      content: (
        <DataTable
          columns={columns}
          data={followupqueue}
          totalPages={totalPages}
          currentPage={currentPage}
          rows={total}
          addLabel="Import Follow UP"
          searchPlaceholder="Cari Follow UP"
        />
      ),
    },
    {
      value: 'duplicated',
      label: 'Duplicated',
      content: (
        <DataTable
          columns={columns}
          data={duplicated_data}
          totalPages={totalPages}
          currentPage={currentPage}
          rows={total}
          addLabel="Import Follow UP"
          searchPlaceholder="Cari Follow UP"
        />
      ),
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default CustomerTable;
