import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { TabData, ICustomer } from '@/types';
import { getCustomer } from '@/app/lib/data/customers';
import ProfileForm from './profile-form';

const ProfileTab = async ({ id }: { id: string }) => {
  const data = await getCustomer(id);
  const { customers } = data;
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Overview',
      content: <ProfileForm value="overview" customer={customers} />,
    },
    {
      value: 'extended',
      label: 'Extended',
      content: <ProfileForm value="extended" customer={customers} />,
    },
    {
      value: 'social',
      label: 'Social',
      content: <ProfileForm value="social" customer={customers} />,
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
