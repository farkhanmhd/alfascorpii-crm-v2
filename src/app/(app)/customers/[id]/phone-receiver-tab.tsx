import React from 'react';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import CustomerCard from '@/components/fragments/cards/CustomerCard';
import PhoneReceiverDialog from './dialogs/phone-receiver-dialog';

const PhoneReceiverTab = () => {
  const receiverData: SelectOptions[] = [
    {
      label: 'Penerima Telepon',
      value: 'Nama',
    },
    {
      label: 'Hubungan dengan Customer',
      value: 'Konsumen Langsung',
    },
    {
      label: 'Keterangan Lainnya',
      value: '-',
    },
    {
      label: 'Nomor Whatsapp',
      value: '08123456789',
    },
  ];

  const receiverDataUpdate: SelectOptions[] = [
    {
      label: 'Alamat',
      value: 'JL. H. Adam Malik',
    },
    {
      label: 'Kelurahan',
      value: 'Silalas',
    },
    {
      label: 'Status Rumah',
      value: '-',
    },
    {
      label: 'Pekerjaan',
      value: '-',
    },
    {
      label: 'Deskripsi Pekerjaan',
      value: '-',
    },
    {
      label: 'Tanggal Lahir',
      value: '-',
    },
    {
      label: 'Hari besar Keagamaan',
      value: '-',
    },
    {
      label: 'Hobi',
      value: '-',
    },
    {
      label: 'Deskripsi Hobi',
      value: '-',
    },
    {
      label: 'Jumlah Orang Serumah',
      value: '-',
    },
    {
      label: 'Jumlah Sepeda Motor di Rumah',
      value: '-',
    },
    {
      label: 'Facebook',
      value: '-',
    },
    {
      label: 'Instagram',
      value: '-',
    },
    {
      label: 'Penghasilan / Bulan',
      value: '-',
    },
    {
      label: 'Pengeluaran / Bulan',
      value: '-',
    },
  ];

  const items = [
    { title: 'Data Penerima', data: receiverData },
    { title: 'Data Update', data: receiverDataUpdate },
  ];

  return (
    <div>
      <div className="flex flex-col gap-8">
        <MapItems
          of={items}
          render={(item, index) => (
            <CustomerCard key={index} title={item.title} data={item.data} />
          )}
        />
      </div>
      <div className="mb-8 mt-6">
        <PhoneReceiverDialog />
      </div>
    </div>
  );
};

export default PhoneReceiverTab;
