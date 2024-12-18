import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { TabData, ICustomer } from '@/types';
import { getCustomer } from '@/app/lib/data/customers';
import { DataTable } from '@/components/fragments/table/DataTable';
import ProfileForm from './profile-form';
import columns from './motorcycle-column';
import MotorcycleData from './motorcycle-data';

const ProfileTab = async ({ id }: { id: string }) => {
  const data = await getCustomer(id);
  const customer: ICustomer = data.customers;
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Overview',
      content: <ProfileForm value="overview" customer={customer} />,
    },
    {
      value: 'update',
      label: 'Data Update',
      content: <ProfileForm value="update" customer={customer} />,
    },
    {
      value: 'social',
      label: 'Social',
      content: <ProfileForm value="social" customer={customer} />,
    },
    {
      value: 'motorcycle',
      label: 'Motor',
      content:
        customer.motorcycles.length > 1 ? (
          <DataTable
            columns={columns}
            data={customer.motorcycles}
            rows={customer.motorcycles.length}
          />
        ) : (
          <MotorcycleData motorcycle={customer.motorcycles[0]} />
        ),
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
