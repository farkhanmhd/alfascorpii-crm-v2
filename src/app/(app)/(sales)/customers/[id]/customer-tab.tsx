import React from 'react';
import { ICustomer, OptionsProps, SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import CustomerCard from '@/components/elements/cards/InformationCard';
import { sanitizeValue } from '@/lib/utils';
import UpdateCustomerDialog from './dialogs/update-customer';

interface Props extends OptionsProps {
  customer: ICustomer;
}

const CustomerTab = ({ ...props }: Props) => {
  const personalInfo: SelectOptions[] = [
    {
      label: 'NIK',
      value: sanitizeValue(props.customer.nik),
    },
    {
      label: 'Nama',
      value: sanitizeValue(props.customer.customer_name),
    },
    {
      label: 'Tanggal Lahir',
      value: sanitizeValue(props.customer.date_of_birth),
    },
    {
      label: 'ALAMAT',
      value: sanitizeValue(props.customer.customer_address),
    },
    {
      label: 'KELURAHAN',
      value: sanitizeValue(props.customer.sub_district),
    },
    {
      label: 'KECAMATAN',
      value: sanitizeValue(props.customer.district),
    },
    {
      label: 'KABUPATEN/KOTA',
      value: sanitizeValue(props.customer.regency_or_city),
    },
    {
      label: 'PROVINSI',
      value: sanitizeValue(props.customer.province),
    },
    {
      label: 'KODE POS',
      value: sanitizeValue(props.customer.postal_code),
    },
  ];

  const socials: SelectOptions[] = [
    {
      label: 'Telepon',
      value: sanitizeValue(props.customer.telephone),
    },
    {
      label: 'No. HP',
      value: sanitizeValue(props.customer.mobile_phone),
    },
    {
      label: 'Whatsapp',
      value: sanitizeValue(props.customer.whatsapp_number),
    },
    {
      label: 'Facebook',
      value: sanitizeValue(props.customer.facebook),
    },
    {
      label: 'Instagram',
      value: sanitizeValue(props.customer.instagram),
    },
    {
      label: 'Email',
      value: sanitizeValue(props.customer.email),
    },
  ];

  const otherInfo: SelectOptions[] = [
    {
      label: 'Status Rumah',
      value: sanitizeValue(props.customer.house_ownership),
    },
    {
      label: 'Pekerjaan',
      value: sanitizeValue(props.customer.job),
    },
    {
      label: 'Hari Besar Keagamaan',
      value: sanitizeValue(props.customer.holiday),
    },
    {
      label: 'Hobi',
      value: sanitizeValue(props.customer.hobby),
    },
    {
      label: 'Deskripsi Hobi',
      value: sanitizeValue(props.customer.hobby_description),
    },
    {
      label: 'Jumlah Orang dalam 1 Rumah',
      value: sanitizeValue(props.customer.amount_of_family),
    },
    {
      label: 'Jumlah Sepeda Motor 1 Rumah',
      value: sanitizeValue(props.customer.amount_of_motorcycle),
    },
    {
      label: 'Penghasilan / Bulan',
      value: sanitizeValue(props.customer.income),
    },
    {
      label: 'Pengeluaran / Bulan',
      value: sanitizeValue(props.customer.expense),
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
        <UpdateCustomerDialog {...props} />
      </div>
    </div>
  );
};

export default CustomerTab;
