import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { TabData } from '@/types';
import ProfileForm from './profile-form';

const tabData: TabData<React.ReactNode>[] = [
  {
    value: 'overview',
    label: 'Overview',
    content: <ProfileForm value="overview" />,
  },
  {
    value: 'extended',
    label: 'Extended',
    content: <ProfileForm value="extended" />,
  },
];

const ProfileTab = () => {
  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
