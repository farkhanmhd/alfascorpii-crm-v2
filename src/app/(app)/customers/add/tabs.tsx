'use client';

import React from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import DatePicker from '@/components/fragments/form/DatePicker';
import TabLayout from '@/components/fragments/tabs/TabLayout';
import DealerList from './dealer-list';

interface TabProps {
  value: string;
}

export const OverviewTab: React.FC<TabProps> = ({ value }) => {
  return (
    <TabLayout currentValue={value} value="overview">
      <DealerList label="Dealer" id="dealer" placeholder="Dealer" />
      <TextInput label="NIK" id="nik" placeholder="Nomor Induk Kependudukan" />

      <TextInput label="Name" id="name" placeholder="Customer Name" />
      <TextInput label="Phone" id="phone" placeholder="+6281234567890" />

      <DatePicker id="date_of_birth" label="Date of Birth" />
      <TextInput label="Address" id="address" placeholder="Customer Address" />
      <TextInput
        label="Sub-district"
        id="sub-District"
        placeholder="Sub-District"
      />
      <TextInput label="District" id="district" placeholder="District" />

      <TextInput
        label="City / Regency"
        id="city"
        placeholder="City / Regency"
      />

      <TextInput label="Province" id="province" placeholder="Province" />
    </TabLayout>
  );
};

export const ExtendedTab: React.FC<TabProps> = ({ value }) => {
  return (
    <TabLayout currentValue={value} value="extended">
      <DealerList label="Job" id="job" placeholder="Customer Job" />
      <DealerList label="Hobby" id="hobby" placeholder="Customer hobby" />
      <DealerList
        label="House Ownership"
        id="house-ownership"
        placeholder="Customer House Ownership"
      />
      <DealerList label="Income" id="income" placeholder="Customer Income" />
      <DealerList label="Expense" id="expense" placeholder="Customer Expense" />
    </TabLayout>
  );
};

export const SocialTab: React.FC<TabProps> = ({ value }) => {
  return (
    <TabLayout currentValue={value} value="social">
      <TextInput label="Whatsapp" id="whatsapp" placeholder="+6281234567890" />
      <TextInput
        label="Instagram"
        id="instagram"
        placeholder="https://instagram.com/username"
      />
      <TextInput
        label="Facebook Link"
        id="facebook"
        placeholder="https://www.facebook.com/username"
      />
      <TextInput
        label="email"
        id="email"
        placeholder="someone@example.com"
        inputMode="email"
      />
    </TabLayout>
  );
};
