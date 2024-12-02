import React from 'react';
import { CustomerPageDetail } from '@/app/lib/data/customers';
import TabLayout from '@/components/fragments/tabs/TabLayout';
import TextInput from '@/components/fragments/form/TextInput';
import DatePicker from '@/components/fragments/form/DatePicker';

interface TabProps {
  value: string;
  customer: CustomerPageDetail;
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
        defaultValue={customer.name}
      />
      <TextInput
        label="Phone"
        id="phone"
        placeholder="+6281234567890"
        defaultValue={customer.phoneNumber}
      />

      <DatePicker
        id="date_of_birth"
        label="Date of Birth"
        initialDate={customer.dateOfBirth}
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
        defaultValue={customer.subDistrict}
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
        defaultValue={customer.city}
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
        defaultValue={customer.job.job.jobName}
      />
      <TextInput
        label="Hobby"
        id="hobby"
        placeholder="Customer hobby"
        defaultValue={customer.hobby.hobby.hobbyName}
      />
      <TextInput
        label="House Ownership"
        id="house-ownership"
        placeholder="Customer House Ownership"
        defaultValue={customer.houseOwnership.houseOwnership.ownershipStatus}
      />
      <TextInput
        label="Holiday"
        id="holiday"
        placeholder="Religious Holiday"
        defaultValue={customer.holidays.reduce(
          (acc, cur) => acc + cur.holiday.holidayName,
          ''
        )}
      />
      <TextInput
        label="Income"
        id="income"
        placeholder="Customer Income"
        defaultValue={customer.finances.income.incomeDetail}
      />
      <TextInput
        label="Expense"
        id="expense"
        placeholder="Customer Expense"
        defaultValue={customer.finances.expense.expenseDetail}
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
        defaultValue={customer.whatsapp as string}
      />
      <TextInput
        label="Instagram"
        id="instagram"
        placeholder="https://instagram.com/username"
        defaultValue={customer.instagram as string}
      />
      <TextInput
        label="Facebook Link"
        id="facebook"
        placeholder="https://www.facebook.com/username"
        defaultValue={customer.facebook as string}
      />
      <TextInput
        label="email"
        id="email"
        placeholder="someone@example.com"
        inputMode="email"
        defaultValue={customer.email as string}
      />
    </TabLayout>
  );
};
