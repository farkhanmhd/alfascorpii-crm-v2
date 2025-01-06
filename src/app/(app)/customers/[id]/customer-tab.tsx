import React from 'react';
import { ICustomer, SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import UpdateCustomerDialog from './dialogs/update-customer';

const CustomerTab = ({ customer }: { customer: ICustomer }) => {
  const filteredCustomer: SelectOptions[] = [
    {
      label: 'NIK',
      value: customer.nik,
    },
    {
      label: 'NAMA',
      value: customer.customer_name,
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
    {
      label: 'TELEPON',
      value: customer.telephone,
    },
    {
      label: 'NO. HP',
      value: customer.mobile_phone,
    },
    {
      label: 'STATUS RUMAH',
      value: customer.house_ownership,
    },
    {
      label: 'PEKERJAAN',
      value: customer.job,
    },
    {
      label: 'TANGGAL LAHIR',
      value: customer.date_of_birth,
    },
    {
      label: 'HARI BESAR KEAGAMAAN',
      value: customer.holiday,
    },
    {
      label: 'HOBI',
      value: customer.hobby,
    },
    {
      label: 'DESKRIPSI HOBI',
      value: customer.hobby_description,
    },
    {
      label: 'JUMLAH ORANG DALAM 1 RUMAH',
      value: String(customer.amount_of_family),
    },
    {
      label: 'JUMLAH SEPEDA MOTOR 1 RUMAH',
      value: String(customer.motorcycles.length),
    },
    {
      label: 'FACEBOOK',
      value: customer.facebook,
    },
    {
      label: 'INSTAGRAM',
      value: customer.instagram,
    },
    {
      label: 'PENGHASILAN/BULAN',
      value: customer.income,
    },
    {
      label: 'PENGELUARAN/BULAN',
      value: customer.expense,
    },
  ];
  return (
    <div className="p-8">
      <div className="flex flex-col gap-y-6">
        <MapItems
          of={filteredCustomer}
          render={(item, index) => (
            <div key={index} className="flex gap-x-8">
              <p className="w-64 font-bold">{item.label}</p>
              <span>:</span>
              <span>{item.value}</span>
            </div>
          )}
        />
      </div>
      <div className="mt-12">
        <UpdateCustomerDialog />
      </div>
    </div>
  );
};

export default CustomerTab;
