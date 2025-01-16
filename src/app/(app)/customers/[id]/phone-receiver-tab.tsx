import React from 'react';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import CustomerCard from '@/components/elements/cards/InformationCard';
import type { IFollowUpRecipient } from '@/types';
import PhoneReceiverDialog from './dialogs/phone-receiver-dialog';

type Props = {
  recipient: IFollowUpRecipient;
};

const PhoneReceiverTab = ({ recipient }: Props) => {
  const receiverData: SelectOptions[] = [
    {
      label: 'Penerima Telepon',
      value: recipient.recipient_name,
    },
    {
      label: 'Hubungan dengan Customer',
      value: recipient.relationship,
    },
    {
      label: 'Keterangan Lainnya',
      value: recipient.additional_information!,
    },
    {
      label: 'Nomor Whatsapp',
      value: recipient.whatsapp_number,
    },
  ];

  const receiverDataUpdate: SelectOptions[] = [
    {
      label: 'Alamat',
      value: recipient.recipient_address,
    },
    {
      label: 'Status Rumah',
      value: recipient.house_ownership,
    },
    {
      label: 'Pekerjaan',
      value: recipient.job,
    },
    {
      label: 'Deskripsi Pekerjaan',
      value: recipient.recipient_job_detail!,
    },
    {
      label: 'Tanggal Lahir',
      value: recipient.recipient_born_date,
    },
    {
      label: 'Hari besar Keagamaan',
      value: recipient.holiday,
    },
    {
      label: 'Hobi',
      value: recipient.hobby,
    },
    {
      label: 'Deskripsi Hobi',
      value: recipient.recipient_hobby_detail,
    },
    {
      label: 'Jumlah Orang Serumah',
      value: String(recipient.amount_of_family),
    },
    {
      label: 'Jumlah Sepeda Motor di Rumah',
      value: String(recipient.amount_of_motorcycle),
    },
    {
      label: 'Facebook',
      value: recipient.facebook,
    },
    {
      label: 'Instagram',
      value: recipient.instagram,
    },
    {
      label: 'Penghasilan / Bulan',
      value: String(recipient.income),
    },
    {
      label: 'Pengeluaran / Bulan',
      value: String(recipient.expense),
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
