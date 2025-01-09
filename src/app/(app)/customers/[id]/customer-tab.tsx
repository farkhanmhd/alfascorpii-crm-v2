import React from 'react';
import { ICustomer, SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import CustomerCard from '@/components/fragments/cards/InformationCard';
import UpdateCustomerDialog from './dialogs/update-customer';

const CustomerTab = ({ customer }: { customer: ICustomer }) => {
  const personalInfo: SelectOptions[] = [
    {
      label: 'NIK',
      value: customer.nik,
    },
    {
      label: 'Nama',
      value: customer.customer_name,
    },
    {
      label: 'Tanggal Lahir',
      value: customer.date_of_birth,
    },
    {
      label: 'ALAMAT',
      value: customer.address,
    },
    {
      label: 'KELURAHAN',
      value: customer.sub_district,
    },
    {
      label: 'KECAMATAN',
      value: customer.district,
    },
    {
      label: 'KABUPATEN/KOTA',
      value: customer.regency_or_city,
    },
    {
      label: 'PROVINSI',
      value: customer.province,
    },
    {
      label: 'KODE POS',
      value: String(customer.postal_code),
    },
  ];

  const socials: SelectOptions[] = [
    {
      label: 'Telepon',
      value: customer.telephone,
    },
    {
      label: 'No. HP',
      value: customer.mobile_phone,
    },
    {
      label: 'Whatsapp',
      value: customer.whatsapp_number,
    },
    {
      label: 'Facebook',
      value: customer.facebook,
    },
    {
      label: 'Instagram',
      value: customer.instagram,
    },
    {
      label: 'Email',
      value: customer.email,
    },
  ];

  const otherInfo: SelectOptions[] = [
    {
      label: 'Status Rumah',
      value: customer.house_ownership,
    },
    {
      label: 'Pekerjaan',
      value: customer.job,
    },
    {
      label: 'Hari Besar Keagamaan',
      value: customer.holiday,
    },
    {
      label: 'Hobi',
      value: customer.hobby,
    },
    {
      label: 'Deskripsi Hobi',
      value: customer.hobby_description,
    },
    {
      label: 'Jumlah Orang dalam 1 Rumah',
      value: String(customer.amount_of_family),
    },
    {
      label: 'Jumlah Sepeda Motor 1 Rumah',
      value: String(customer.motorcycles.length),
    },

    {
      label: 'Penghasilan / Bulan',
      value: customer.income,
    },
    {
      label: 'Pengeluaran / Bulan',
      value: customer.expense,
    },
  ];

  const items = [
    { title: 'Data Pribadi', data: personalInfo },
    { title: 'Kontak dan Social Media', data: socials },
    { title: 'Informasi Lainnya', data: otherInfo },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-8">
        <MapItems
          of={items}
          render={(item, index) => (
            <div className="flex-grow basis-[320px]">
              <CustomerCard key={index} title={item.title} data={item.data} />
            </div>
          )}
        />
      </div>
      <div className="mb-8 mt-6">
        <UpdateCustomerDialog />
      </div>
    </div>
  );
};

export default CustomerTab;
