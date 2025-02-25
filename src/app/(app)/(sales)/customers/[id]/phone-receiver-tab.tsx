import React from 'react';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import CustomerCard from '@/components/elements/cards/InformationCard';
import type { ICustomer, IFollowUpRecipient, OptionsProps } from '@/types';
import { sanitizeValue } from '@/lib/utils';
import PhoneReceiverDialog from './dialogs/phone-receiver-dialog';

export type PhoneReceiverProps = {
  recipient: IFollowUpRecipient;
  customer: ICustomer;
};

const PhoneReceiverTab = ({ ...props }: PhoneReceiverProps) => {
  const receiverData: SelectOptions[] = [
    {
      label: 'Penerima Telepon',
      value: sanitizeValue(props.recipient.recipient_name),
    },
    {
      label: 'Hubungan dengan Customer',
      value: sanitizeValue(props.recipient.relationship),
    },
    {
      label: 'Keterangan Lainnya',
      value: sanitizeValue(props.recipient.additional_information),
    },
    {
      label: 'Nomor Whatsapp',
      value: sanitizeValue(props.recipient.whatsapp_number),
    },
  ];

  const receiverDataUpdate: SelectOptions[] = [
    {
      label: 'Alamat',
      value: sanitizeValue(props.recipient.recipient_address),
    },
    {
      label: 'Status Rumah',
      value: sanitizeValue(props.recipient.house_ownership),
    },
    { label: 'Pekerjaan', value: sanitizeValue(props.recipient.job) },
    {
      label: 'Deskripsi Pekerjaan',
      value: sanitizeValue(props.recipient.recipient_job_detail),
    },
    {
      label: 'Tanggal Lahir',
      value: sanitizeValue(props.recipient.recipient_born_date),
    },
    {
      label: 'Hari besar Keagamaan',
      value: sanitizeValue(props.recipient.holiday),
    },
    { label: 'Hobi', value: sanitizeValue(props.recipient.hobby) },
    {
      label: 'Deskripsi Hobi',
      value: sanitizeValue(props.recipient.recipient_hobby_detail),
    },
    {
      label: 'Jumlah Orang Serumah',
      value: sanitizeValue(props.recipient.amount_of_family),
    },
    {
      label: 'Jumlah Sepeda Motor di Rumah',
      value: sanitizeValue(props.recipient.amount_of_motorcycle),
    },
    { label: 'Facebook', value: sanitizeValue(props.recipient.facebook) },
    { label: 'Instagram', value: sanitizeValue(props.recipient.instagram) },
    {
      label: 'Penghasilan / Bulan',
      value: sanitizeValue(props.recipient.income),
    },
    {
      label: 'Pengeluaran / Bulan',
      value: sanitizeValue(props.recipient.expense),
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
        <PhoneReceiverDialog
          {...(props as {
            recipient: IFollowUpRecipient;
            customer: ICustomer;
          } & OptionsProps &
            ICustomer)}
        />
      </div>
    </div>
  );
};

export default PhoneReceiverTab;
