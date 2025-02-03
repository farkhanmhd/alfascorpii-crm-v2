import React from 'react';
import TextInput from '@/components/elements/form/TextInput';
import DatePicker from '@/components/elements/form/DatePicker';
import { IMotorcycle } from '@/types';

const MotorcycleData = ({ motorcycle }: { motorcycle: IMotorcycle }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <TextInput
        label="Type"
        id="motorcycle-type"
        defaultValue={motorcycle.motorcycle_type}
        placeholder="Type"
        disabled
      />
      <TextInput
        label="Warna"
        id="motorcycle-color"
        defaultValue={motorcycle.color}
        placeholder="Warna"
        disabled
      />
      <TextInput
        label="Nomor Rangka"
        id="motorcycle-frame-number"
        defaultValue={motorcycle.frame_number}
        placeholder="Nomor Rangka"
        disabled
      />
      <TextInput
        label="Nomor Mesin"
        id="motorcycle-engine-number"
        defaultValue={motorcycle.engine_number}
        placeholder="Nomor Mesin"
        disabled
      />
      <TextInput
        label="Metode Pembelian"
        id="motorcycle-purchase"
        defaultValue={motorcycle.payment_method}
        placeholder="Warna"
        disabled
      />
      <TextInput
        label="Leasing"
        id="motorcycle-purchase"
        defaultValue={motorcycle.leasing_name}
        placeholder="Warna"
        disabled
      />
      <DatePicker
        label="Tanggal Pembelian"
        id="purchase-date"
        date={new Date(motorcycle.purchase_date) || new Date()}
      />
    </div>
  );
};

export default MotorcycleData;
