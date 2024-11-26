import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { CustomerPageDetail, getCustomer } from '@/app/lib/data/customers';
import { TabData } from '@/types';
import ProfileForm from './profile-form';

const ProfileTab = async ({ id }: { id: string }) => {
  const customer: CustomerPageDetail = await getCustomer(id);
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Overview',
      content: <ProfileForm value="overview" customer={customer} />,
    },
    {
      value: 'extended',
      label: 'Extended',
      content: <ProfileForm value="extended" customer={customer} />,
    },
    {
      value: 'social',
      label: 'Social',
      content: <ProfileForm value="social" customer={customer} />,
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
