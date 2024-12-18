'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/fragments/form/TextInput';
import DatePicker from '@/components/fragments/form/DatePicker';
import ComboBox from '@/components/fragments/form/ComboBox';
import SelectBox from '@/components/fragments/form/Select';
import TextField from '@/components/fragments/form/TextArea';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ComboBoxOptions, SelectOptions } from '@/types';

const relationship: SelectOptions[] = [
  {
    label: 'Konsumen Langsung',
    value: 'Konsumen Langsung',
  },
  {
    label: 'Ayah Anak',
    value: 'Ayah Anak',
  },
];

const fuMethod: SelectOptions[] = [
  {
    label: 'Call',
    value: 'Call',
  },
  {
    label: 'Whatsapp',
    value: 'Whatsapp',
  },
];

const fuStatus: SelectOptions[] = [
  {
    label: 'Contacted',
    value: 'Contacted',
  },
  {
    label: 'Not Contacted',
    value: 'Not Contacted',
  },
  {
    label: 'Delivered',
    value: 'Delivered',
  },
  {
    label: 'Not Delivered',
    value: 'Not Delivered',
  },
];

const fuDetail: SelectOptions[] = [
  {
    label: 'Tidak Berminat',
    value: 'Tidak Berminat',
  },
  {
    label: 'Belum Berminat',
    value: 'Belum Berminat',
  },
  {
    label: 'Sedang Sibuk',
    value: 'Sedang Sibuk',
  },
  {
    label: 'Cold',
    value: 'Cold',
  },
  {
    label: 'Warm',
    value: 'Warm',
  },
  {
    label: 'Hot',
    value: 'Hot',
  },
  {
    label: 'Nomor Telepon Tidak Diangkat',
    value: 'Nomor Telepon Tidak Diangkat',
  },
  {
    label: 'Nomor Telepon Tidak Terdaftar',
    value: 'Nomor Telepon Tidak Terdaftar',
  },
  {
    label: 'Nomor Telepon Tidak Bisa Dihubungi',
    value: 'Nomor Telepon Tidak Bisa Dihubungi',
  },
  {
    label: 'Nomor Telepon Yang Diputar Salah',
    value: 'Nomor Telepon Yang Diputar Salah',
  },
  {
    label: 'Nomor Telepon Salah Sambung',
    value: 'Nomor Telepon Salah Sambung',
  },
  {
    label: 'Nomor Telepon Tidak Aktif',
    value: 'Nomor Telepon Tidak Aktif',
  },
];

const motorcycle: ComboBoxOptions[] = [
  {
    label: 'R15',
    value: 'R15',
  },
  {
    label: 'XSR 155',
    value: 'XSR 155',
  },
  {
    label: 'WR 155',
    value: 'WR 155',
  },
];

const houseOwnership: SelectOptions[] = [
  {
    label: 'Milik Sendiri',
    value: 'Milik Sendiri',
  },
  {
    label: 'Kontrak/Sewa',
    value: 'Kontrak/Sewa',
  },
];

const job: SelectOptions[] = [
  {
    label: 'Aparatur Sipil Negara',
    value: 'Aparatur Sipil Negara',
  },
  {
    label: 'Karyawan Swasta',
    value: 'Karyawan Swasta',
  },
];

const holidays: SelectOptions[] = [
  {
    label: 'Idul Fitri',
    value: 'Idul Fitri',
  },
  {
    label: 'Natal',
    value: 'Natal',
  },
];
const hobby: SelectOptions[] = [
  {
    label: 'Olahraga',
    value: 'Olahraga',
  },
  {
    label: 'Fotografi',
    value: 'Fotografi',
  },
];

const finance: SelectOptions[] = [
  {
    label: 'Rp. 5.000.000',
    value: 'Rp, 5.000.000',
  },
  {
    label: 'Rp. 10.000.000',
    value: 'Rp, 10.000.000',
  },
];

const Page = () => {
  const [motorcycleValue, setMotorcycleValue] = useState<string>('');
  const { back } = useRouter();

  const handleMotorcycleChange = (value: string) => {
    setMotorcycleValue(value);
  };

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h2 className="text-lg font-semibold">Data Penerima</h2>
      <div className="flex flex-col gap-y-6 lg:grid lg:grid-cols-2 lg:gap-6">
        <TextInput
          id="phone-receiver"
          label="Penerima Telepon"
          placeholder="Penerima Telepon"
        />
        <SelectBox
          label="Hubungan Dengan Customer"
          id="relationship"
          placeholder="Hubungan Dengan Customer"
          options={relationship}
        />
      </div>
      <Separator />
      <h2 className="text-lg font-semibold">Data Follow Up</h2>
      <div className="flex flex-col gap-y-6 lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="lg:col-span-2">
          <DatePicker id="follow-up-date" label="Tanggal" />
        </div>
        <SelectBox
          label="Metode Follow Up"
          id="fu-method"
          placeholder="Pilih Metode Follow Up"
          options={fuMethod}
        />
        <SelectBox
          label="Status Follow Up"
          id="fu-status"
          placeholder="Pilih Status Follow Up"
          options={fuStatus}
        />
        <SelectBox
          label="Detail Follow Up"
          id="fu-detail"
          placeholder="Pilih Detail Follow Up"
          options={fuDetail}
        />
        <ComboBox
          id="motorcycle"
          label="Minat Sepeda Motor"
          placeholder="Pilih Sepeda Motor"
          options={motorcycle}
          error={[]}
          value={motorcycleValue}
          onSelect={handleMotorcycleChange}
        />
        <div className="lg:col-span-2">
          <TextField
            id="fu-description"
            label="Deskripsi"
            error={[]}
            placeholder="Deskripsi Follow Up"
            className="resize-none"
          />
        </div>
      </div>
      <Separator />
      <h2 className="text-lg font-semibold">Data Update</h2>
      <div className="flex flex-col gap-y-6 lg:grid lg:grid-cols-2 lg:gap-6">
        <TextInput
          id="address"
          label="Alamat Tinggal"
          placeholder="Alamat Tinggal"
        />
        <SelectBox
          label="Status Rumah"
          id="house-ownership"
          placeholder="Status Rumah"
          options={houseOwnership}
        />
        <DatePicker id="date-of-birth" label="Tanggal Lahir" />
        <SelectBox
          label="Hari Besar"
          id="holiday"
          placeholder="Hari Besar"
          options={holidays}
        />
        <div className="lg:col-span-2">
          <SelectBox
            label="Pekerjaan"
            id="job"
            placeholder="Pekerjaan"
            options={job}
          />
        </div>
        <div className="lg:col-span-2">
          <TextField
            id="job-description"
            label="Deskripsi Pekerjaan"
            error={[]}
            placeholder="Deskripsi Pekerjaan"
            className="resize-none"
          />
        </div>
        <div className="lg:col-span-2">
          <SelectBox
            label="Hobi"
            id="hobby"
            placeholder="Hobi"
            options={hobby}
          />
        </div>
        <div className="lg:col-span-2">
          <TextField
            id="hobby-description"
            label="Deskripsi Hobi"
            error={[]}
            placeholder="Deskripsi Hobi"
            className="resize-none"
          />
        </div>
        <TextInput
          id="amount-of-family"
          label="Jumlah Orang Serumah"
          placeholder="Jumlah Orang Serumah"
          inputMode="numeric"
        />
        <TextInput
          id="amount-family-under-12"
          label="Serumah Dibawah 12 Tahun"
          placeholder="Serumah Dibawah 12 Tahun"
          inputMode="numeric"
        />
        <TextInput
          id="amount-family-12-17"
          label="Serumah 12 - 17 Tahun"
          placeholder="Serumah 12 - 17 Tahun"
          inputMode="numeric"
        />
        <TextInput
          id="amount-motorcycle"
          label="Jumlah Motor Serumah"
          placeholder="Jumlah Motor Serumah"
          inputMode="numeric"
        />
        <TextInput id="whatsapp" label="Whatsapp" placeholder="Whatsapp" />
        <TextInput
          id="facebook"
          label="Link Facebook"
          placeholder="Link Facebook"
        />
        <TextInput
          id="instagram"
          label="Link Instagram"
          placeholder="Alamat Tinggal"
        />
        <TextInput id="email" label="Email" placeholder="Email" type="email" />
        <SelectBox
          id="income"
          label="Penghasilan Perbulan"
          placeholder="Penghasilan Perbulan"
          options={finance}
        />
        <SelectBox
          id="expense"
          label="Pengeluaran Perbulan"
          placeholder="Pengeluaran Perbulan"
          options={finance}
        />
        <div className="lg:col-span-2">
          <TextField
            id="result-description"
            label="Keterangan Hasil Telp. Customer"
            placeholder="Keterangan Hasil Telp. Customer"
            className="resize-none"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={back}>
          Kembali
        </Button>
        <SubmitButton className="self-end">Submit Follow Up</SubmitButton>
      </div>
    </div>
  );
};

export default Page;
