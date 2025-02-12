import React from 'react';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import CustomerCard from '@/components/elements/cards/InformationCard';
import type { IFollowUpRecipient } from '@/types';
import PhoneReceiverDialog from './dialogs/phone-receiver-dialog';

type Props = {
  recipient: IFollowUpRecipient;
};

const sanitizeValue = (value: any) =>
  value !== undefined && value !== null && String(value).trim() !== ''
    ? String(value)
    : '-';

const PhoneReceiverTab = ({ recipient }: Props) => {
  const data =
    Array.isArray(recipient) && recipient.length > 0
      ? recipient[0]
      : ({} as IFollowUpRecipient);

  const receiverData: SelectOptions[] = [
    { label: 'Penerima Telepon', value: sanitizeValue(data.recipient_name) },
    {
      label: 'Hubungan dengan Customer',
      value: sanitizeValue(data.relationship),
    },
    {
      label: 'Keterangan Lainnya',
      value: sanitizeValue(data.additional_information),
    },
    { label: 'Nomor Whatsapp', value: sanitizeValue(data.whatsapp_number) },
  ];

  const receiverDataUpdate: SelectOptions[] = [
    { label: 'Alamat', value: sanitizeValue(data.recipient_address) },
    { label: 'Status Rumah', value: sanitizeValue(data.house_ownership) },
    { label: 'Pekerjaan', value: sanitizeValue(data.job) },
    {
      label: 'Deskripsi Pekerjaan',
      value: sanitizeValue(data.recipient_job_detail),
    },
    { label: 'Tanggal Lahir', value: sanitizeValue(data.recipient_born_date) },
    { label: 'Hari besar Keagamaan', value: sanitizeValue(data.holiday) },
    { label: 'Hobi', value: sanitizeValue(data.hobby) },
    {
      label: 'Deskripsi Hobi',
      value: sanitizeValue(data.recipient_hobby_detail),
    },
    {
      label: 'Jumlah Orang Serumah',
      value: sanitizeValue(data.amount_of_family),
    },
    {
      label: 'Jumlah Sepeda Motor di Rumah',
      value: sanitizeValue(data.amount_of_motorcycle),
    },
    { label: 'Facebook', value: sanitizeValue(data.facebook) },
    { label: 'Instagram', value: sanitizeValue(data.instagram) },
    { label: 'Penghasilan / Bulan', value: sanitizeValue(data.income) },
    { label: 'Pengeluaran / Bulan', value: sanitizeValue(data.expense) },
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
