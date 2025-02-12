import React from 'react';
import { ICustomer, OptionsProps, SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import CustomerCard from '@/components/elements/cards/InformationCard';
import UpdateCustomerDialog from './dialogs/update-customer';

interface Props extends OptionsProps {
  customer: ICustomer;
}

const CustomerTab = ({ ...props }: Props) => {
  const personalInfo: SelectOptions[] = [
    {
      label: 'NIK',
      value: props.customer.nik,
    },
    {
      label: 'Nama',
      value: props.customer.customer_name,
    },
    {
      label: 'Tanggal Lahir',
      value: props.customer.date_of_birth,
    },
    {
      label: 'ALAMAT',
      value: props.customer.customer_address,
    },
    {
      label: 'KELURAHAN',
      value: props.customer.sub_district,
    },
    {
      label: 'KECAMATAN',
      value: props.customer.district,
    },
    {
      label: 'KABUPATEN/KOTA',
      value: props.customer.regency_or_city,
    },
    {
      label: 'PROVINSI',
      value: props.customer.province,
    },
    {
      label: 'KODE POS',
      value: String(props.customer.postal_code),
    },
  ];

  const socials: SelectOptions[] = [
    {
      label: 'Telepon',
      value: props.customer.telephone,
    },
    {
      label: 'No. HP',
      value: props.customer.mobile_phone,
    },
    {
      label: 'Whatsapp',
      value: props.customer.whatsapp_number,
    },
    {
      label: 'Facebook',
      value: props.customer.facebook,
    },
    {
      label: 'Instagram',
      value: props.customer.instagram,
    },
    {
      label: 'Email',
      value: props.customer.email,
    },
  ];

  const sanitizeValue = (value: any) =>
    value !== undefined && value !== null && String(value).trim() !== ''
      ? String(value)
      : '-';

  const otherInfo: SelectOptions[] = [
    {
      label: 'Status Rumah',
      value: props.customer.house_ownership,
    },
    {
      label: 'Pekerjaan',
      value: props.customer.job,
    },
    {
      label: 'Hari Besar Keagamaan',
      value: props.customer.holiday,
    },
    {
      label: 'Hobi',
      value: props.customer.hobby,
    },
    {
      label: 'Deskripsi Hobi',
      value: props.customer.hobby_description,
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
      value: props.customer.income,
    },
    {
      label: 'Pengeluaran / Bulan',
      value: props.customer.expense,
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
