import React from 'react';
import CustomTabs from '@/components/fragments/tabs';
import { TabData } from '@/types';
import AddCustomerForm from './add-customer-form';

const tabData: TabData<React.ReactNode>[] = [
  {
    value: 'overview',
    label: 'Overview',
    content: <AddCustomerForm value="overview" />,
  },
  {
    value: 'extended',
    label: 'Extended',
    content: <AddCustomerForm value="extended" />,
  },
  {
    value: 'social',
    label: 'Socials',
    content: <AddCustomerForm value="social" />,
  },
];

const AddCustomerTab = () => {
  return <CustomTabs tabData={tabData} />;
};

export default AddCustomerTab;
