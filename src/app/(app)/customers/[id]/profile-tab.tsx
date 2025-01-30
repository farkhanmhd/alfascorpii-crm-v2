import React from 'react';
import CustomTabs from '@/components/elements/tabs';
import { TabData, ICustomer } from '@/types';
import { getCustomer } from '@/app/lib/data/customers';
// import { getAllDealersList } from '@/app/lib/data/dealers';
import { getJobOptions } from '@/app/lib/data/customerjobs';
import { getHolidayOptions } from '@/app/lib/data/holidays';
import { getAllMotorcyclesList } from '@/app/lib/data/motorcycles';
import { getFuMethodOptions } from '@/app/lib/data/fumethod';
import { getRelationOptions } from '@/app/lib/data/relations';
import { getStatusFuOptions } from '@/app/lib/data/statusfus';
import { getFuDetailOptions } from '@/app/lib/data/detailfu';
import { getFuResultOptions } from '@/app/lib/data/furesult';
import { getIncomeOptions } from '@/app/lib/data/incomes';
import { getExpenseOptions } from '@/app/lib/data/expenses';
import { getHobbyOptions } from '@/app/lib/data/hobbies';
import { getHouseOwnershipOptions } from '@/app/lib/data/houseownerships';
import CustomerTab from './customer-tab';
import FollowUpTab from './follow-up-tab';
import PhoneReceiverTab from './phone-receiver-tab';
import MotorcycleTab from './motorcycle-tab';
import FamilyTab from './family-tab';

const ProfileTab = async ({ id }: { id: string }) => {
  const { data } = await getCustomer(id);
  const customer: ICustomer = data.customers;
  const { family_card: familyCard, related_person: relatedFamily } = customer;

  // const dealers = await getAllDealersList();

  const options = {
    motorcyclesOpts: await getAllMotorcyclesList(),
    holidayOpts: await getHolidayOptions(),
    jobOpts: await getJobOptions(),
    relationOpts: await getRelationOptions(),
    fuDetailOpts: await getFuDetailOptions(),
    fuResultOpts: await getFuResultOptions(),
    fuMethodOpts: await getFuMethodOptions(),
    fuStatusOpts: await getStatusFuOptions(),
    incomeOpts: await getIncomeOptions(),
    expenseOpts: await getExpenseOptions(),
    hobbyOpts: await getHobbyOptions(),
    houseOwnershipOpts: await getHouseOwnershipOptions(),
  };

  const tabData: TabData<React.ReactNode>[] = [
    {
      value: 'overview',
      label: 'Data Customer',
      content: <CustomerTab customer={customer} {...options} />,
    },
    {
      value: 'update',
      label: 'Follow Up',
      content: <FollowUpTab followUps={customer.follow_up} {...options} />,
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
