import React from 'react';
import TabLayout from '@/components/fragments/tabs/TabLayout';
import TextInput from '@/components/fragments/form/TextInput';
import DatePicker from '@/components/fragments/form/DatePicker';
import { ICustomer } from '@/types';

interface TabProps {
  value: string;
  customer: ICustomer;
}

export const OverviewTab: React.FC<TabProps> = ({ value, customer }) => {
  return (
    <TabLayout currentValue={value} value="overview">
      <TextInput
        label="NIK"
        id="nik"
        placeholder="Nomor Induk Kependudukan"
        defaultValue={customer.nik}
      />

      <TextInput
        label="Name"
        id="name"
        placeholder="Customer Name"
        defaultValue={customer.customer_name}
      />
      <TextInput
        label="Phone"
        id="phone"
        placeholder="+6281234567890"
        defaultValue={customer.mobile_phone}
      />

      <DatePicker
        id="date_of_birth"
        label="Date of Birth"
        initialDate={new Date(customer.date_of_birth)}
      />
      <TextInput
        label="Address"
        id="address"
        placeholder="Customer Address"
        defaultValue={customer.address}
      />
      <TextInput
        label="Sub-district"
        id="sub-District"
        placeholder="Sub-District"
        defaultValue={customer.sub_district}
      />
      <TextInput
        label="District"
        id="district"
        placeholder="District"
        defaultValue={customer.district}
      />

      <TextInput
        label="City / Regency"
        id="city"
        placeholder="City / Regency"
        defaultValue={customer.regency_or_city}
      />

      <TextInput
        label="Province"
        id="province"
        placeholder="Province"
        defaultValue={customer.province}
      />
    </TabLayout>
  );
};

export const ExtendedTab: React.FC<TabProps> = ({ value, customer }) => {
  return (
    <TabLayout currentValue={value} value="extended">
      <TextInput
        label="Job"
        id="job"
        placeholder="Customer Job"
        defaultValue={customer.job_name}
      />
      <TextInput
        label="Hobby"
        id="hobby"
        placeholder="Customer hobby"
        defaultValue={customer.hobby}
      />
      <TextInput
        label="House Ownership"
        id="house-ownership"
        placeholder="Customer House Ownership"
        defaultValue={customer.house_ownership_status}
      />
      <TextInput
        label="Income"
        id="income"
        placeholder="Customer Income"
        defaultValue={customer.income_per_month}
      />
      <TextInput
        label="Expense"
        id="expense"
        placeholder="Customer Expense"
        defaultValue={customer.expense_per_month}
      />
    </TabLayout>
  );
};

export const SocialTab: React.FC<TabProps> = ({ value, customer }) => {
  return (
    <TabLayout currentValue={value} value="social">
      <TextInput
        label="Whatsapp"
        id="whatsapp"
        placeholder="+6281234567890"
        defaultValue={customer.whatsapp_number}
      />
      <TextInput
        label="Instagram"
        id="instagram"
        placeholder="https://instagram.com/username"
        defaultValue={customer.instagram}
      />
      <TextInput
        label="Facebook Link"
        id="facebook"
        placeholder="https://www.facebook.com/username"
        defaultValue={customer.facebook}
      />
      <TextInput
        label="email"
        id="email"
        placeholder="someone@example.com"
        inputMode="email"
        defaultValue={customer.email}
      />
    </TabLayout>
  );
};
