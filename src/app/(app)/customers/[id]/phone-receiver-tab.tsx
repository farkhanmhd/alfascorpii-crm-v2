import React from 'react';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import PhoneReceiverDialog from './dialogs/phone-receiver-dialog';

const PhoneReceiverTab = () => {
  const receiverData: SelectOptions[] = [
    {
      label: 'PENERIMA TELEPON',
      value: 'Nama',
    },
    {
      label: 'HUBUNGAN DENGAN CUSTOMER',
      value: 'Konsumen Langsung',
    },
    {
      label: 'KETERANGAN LAINNYA',
      value: '-',
    },
    {
      label: 'NOMOR WHATSAPP',
      value: '08123456789',
    },
    {
      label: 'alamat',
      value: 'JL. H. Adam Malik',
    },
    {
      label: 'kelurahan',
      value: 'Silalas',
    },
    {
      label: 'status rumah',
      value: '-',
    },
    {
      label: 'pekerjaan',
      value: '-',
    },
    {
      label: 'deskripsi pekerjaan',
      value: '-',
    },
    {
      label: 'tanggal lahir',
      value: '-',
    },
    {
      label: 'hari besar keagamaan',
      value: '-',
    },
    {
      label: 'hobi',
      value: '-',
    },
    {
      label: 'deskripsi hobi',
      value: '-',
    },
    {
      label: 'jumlah orang serumah',
      value: '-',
    },
    {
      label: 'jumlah sepeda motor di rumah',
      value: '-',
    },
    {
      label: 'facebook',
      value: '-',
    },
    {
      label: 'instagram',
      value: '-',
    },
    {
      label: 'penghasilan per bulan',
      value: '-',
    },
    {
      label: 'pengeluaran per bulan',
      value: '-',
    },
  ];
  return (
    <div className="p-8">
      <div className="flex gap-x-24">
        <div className="flex flex-col gap-y-6">
          <MapItems
            of={receiverData.slice(0, 4)}
            render={(item, index) => (
              <div className="flex gap-x-8" key={index}>
                <p className="w-64 font-bold uppercase">{item.label}</p>
                <span>:</span>
                <span>{item.value}</span>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col gap-y-6">
          <MapItems
            of={receiverData.slice(4, receiverData.length)}
            render={(item, index) => (
              <div className="flex gap-x-8" key={index}>
                <p className="w-64 font-bold uppercase">{item.label}</p>
                <span>:</span>
                <span>{item.value}</span>
              </div>
            )}
          />
        </div>
      </div>
      <PhoneReceiverDialog />
    </div>
  );
};

export default PhoneReceiverTab;
