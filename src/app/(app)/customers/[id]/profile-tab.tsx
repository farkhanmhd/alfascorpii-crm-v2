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
  const { data } = await getCustomer(id);
  const customer: ICustomer = data.customers;
  const { family_card: familyCard, related_person: relatedFamily } = customer;
  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Data Customer',
      content: <CustomerTab customer={customer} />,
    },
    {
      value: 'update',
      label: 'Follow Up',
      content: <FollowUpTab followUps={customer.follow_up} />,
    },
    {
      value: 'social',
      label: 'Data Penerima Telepon',
      content: <PhoneReceiverTab recipient={customer.follow_up_recipient} />,
    },
    {
      value: 'motorcycle',
      label: 'Data Motor',
      content: <MotorcycleTab motorcycles={customer.motorcycles} />,
    },
    {
      value: 'family',
      label: 'Kartu Keluarga',
      content: (
        <FamilyTab families={familyCard} relatedPersons={relatedFamily} />
      ),
    },
  ];

  return <CustomTabs tabData={tabData} />;
};

export default ProfileTab;
