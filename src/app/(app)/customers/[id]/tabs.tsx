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
        label="Nama"
        id="name"
        placeholder="Nama Customer"
        defaultValue={customer.customer_name}
      />
      <TextInput
        label="Nomor Handphone"
        id="phone"
        placeholder="Nomor Handphone"
        defaultValue={customer.mobile_phone}
      />

      <DatePicker
        label="Tanggal Lahir"
        id="date_of_birth"
        initialDate={new Date(customer.date_of_birth)}
      />
      <TextInput
        label="Alamat"
        id="address"
        placeholder="Alamat"
        defaultValue={customer.address}
      />
      <TextInput
        label="Kelurahan"
        id="sub-District"
        placeholder="Kelurahan"
        defaultValue={customer.sub_district}
      />
      <TextInput
        label="Kecamatan"
        id="district"
        placeholder="Kecamatan"
        defaultValue={customer.district}
      />

      <TextInput
        label="Kota / Kabupaten"
        id="city"
        placeholder="Kota / Kabupaten"
        defaultValue={customer.regency_or_city}
      />

      <TextInput
        label="Provinsi"
        id="province"
        placeholder="Provinsi"
        defaultValue={customer.province}
      />
    </TabLayout>
  );
};

export const UpdateTab: React.FC<TabProps> = ({ value, customer }) => {
  return (
    <TabLayout currentValue={value} value="update">
      <TextInput
        label="Pekerjaan"
        id="job"
        placeholder="Pekerjaan"
        defaultValue={customer.job}
      />
      <TextInput
        label="Hobi"
        id="hobby"
        placeholder="Hobi"
        defaultValue={customer.hobby}
      />
      <TextInput
        label="Status Rumah"
        id="house-ownership"
        placeholder="Status Rumah"
        defaultValue={customer.house_ownership}
      />
      <TextInput
        label="Pendapatan"
        id="income"
        placeholder="Pendapatan"
        defaultValue={customer.income}
      />
      <TextInput
        label="Pengeluaran"
        id="expense"
        placeholder="Pengeluaran"
        defaultValue={customer.expense}
      />
      <TextInput
        label="Hari Besar"
        id="holiday"
        placeholder="Hari Besar"
        defaultValue={customer.holiday}
      />
      <TextInput
        label="Jumlah Orang Serumah"
        id="amount_of_family"
        placeholder="Jumlah Orang Serumah"
        defaultValue={customer.amount_of_family}
      />
      <TextInput
        label="Serumah Usia dibawah 12 tahun"
        id="family_under_12_yo"
        placeholder="Serumah Usia dibawah 12 tahun"
        defaultValue={customer.family_under_12_yo}
      />
      <TextInput
        label="Serumah Usia 12 - 17 tahun"
        id="family_under_12_yo"
        placeholder="Serumah Usia 12 - 17 tahun"
        defaultValue={customer.family_12_until_17_yo}
      />
      <TextInput
        label="Jumlah Motor Serumah"
        id="amount_of_motorcycle"
        placeholder="Jumlah Motor Serumah"
        defaultValue={customer.amount_of_motorcycle}
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
        placeholder="Nomor Whatsapp"
        defaultValue={customer.whatsapp_number}
      />
      <TextInput
        label="Instagram"
        id="instagram"
        placeholder="Link Instagram"
        defaultValue={customer.instagram}
      />
      <TextInput
        label="Facebook Link"
        id="facebook"
        placeholder="Link Facebook"
        defaultValue={customer.facebook}
      />
      <TextInput
        label="email"
        id="email"
        placeholder="email"
        inputMode="email"
        defaultValue={customer.email}
      />
    </TabLayout>
  );
};
