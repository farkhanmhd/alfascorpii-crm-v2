import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { TabData, ICustomer } from '@/types';
import { getCustomer } from '@/app/lib/data/customers';
import CustomerTab from './customer-tab';
import FollowUpTab from './follow-up-tab';
import PhoneReceiverTab from './phone-receiver-tab';
import MotorcycleTab from './motorcycle-tab';
import FamilyTab from './family-tab';

const ProfileTab = async ({ id }: { id: string }) => {
  const data = await getCustomer(id);
  const customer: ICustomer = data.customers;
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Data Customer',
      content: <CustomerTab customer={customer} />,
    },
    {
      value: 'update',
      label: 'Follow Up',
      content: <FollowUpTab />,
    },
    {
      value: 'social',
      label: 'Data Penerima Telepon',
      content: <PhoneReceiverTab />,
    },
    {
      value: 'motorcycle',
      label: 'Data Motor',
      content: <MotorcycleTab />,
    },
    {
      value: 'family',
      label: 'Kartu Keluarga',
      content: <FamilyTab />,
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
