'use client';

import React from 'react';
import { SelectFilter } from '@/components/fragments/form/Select';
import DatePicker from '@/components/fragments/form/DatePicker';
import ComboBox from '@/components/fragments/form/ComboBox';
import { SelectOptions } from '@/types';

const dateOptions: SelectOptions[] = [
  { label: 'Tanggal Beli', value: 'purchase_date' },
  { label: 'Tanggal Follow Up', value: 'fu_date' },
];

const fuOptions: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Follow Up 1', value: 'fu_1' },
  { label: 'Follow Up 2', value: 'fu_2' },
  { label: 'Follow Up 3', value: 'fu_3' },
  { label: 'Deal', value: 'deal' },
  { label: 'Reject', value: 'reject' },
];

const fuDetail: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Tidak Berminat', value: 'tidak berminat' },
  { label: 'Belum Berminat', value: 'belum berminat' },
  { label: 'Sedang Sibuk', value: 'sedang sibuk' },
  { label: 'Cold', value: 'cold' },
  { label: 'Warm', value: 'warm' },
  { label: 'Hot', value: 'hot' },
];

const croNames: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Not Assigned', value: 'not_assigned' },
  { label: 'CRO 1', value: 'CRO 1' },
  { label: 'CRO 2', value: 'CRO 2' },
  { label: 'CRO 3', value: 'CRO 3' },
  { label: 'CRO 4', value: 'CRO 4' },
  { label: 'CRO 5', value: 'CRO 5' },
  { label: 'CRO 6', value: 'CRO 6' },
  { label: 'CRO 7', value: 'CRO 7' },
  { label: 'CRO 8', value: 'CRO 8' },
];

const motorcycles: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'YZF R15', value: 'YZF R15' },
  { label: 'MT 25', value: 'MT 25' },
  { label: 'XSR 155', value: 'XSR 155' },
  { label: 'YZR M1', value: 'YZR M1' },
];

const holidays: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Idul Fitri', value: 'Idul Fitri' },
  { label: 'Natal', value: 'Natal' },
];

const FollowUpFilters = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <SelectFilter
        label="Opsi Tanggal"
        id="date_option"
        placeholder="Pilih Opsi Tanggal"
        queryParams="date_option"
        options={dateOptions}
      />
      <DatePicker id="start_date" label="Tanggal Awal" />
      <DatePicker id="end_date" label="Tanggal Akhir" />
      <SelectFilter
        label="Follow Up"
        id="fu_option"
        placeholder="Pilih Opsi FU"
        queryParams="fu_option"
        options={fuOptions}
      />
      <SelectFilter
        label="Keterangan Follow UP"
        id="fu_detail"
        placeholder="Pilih Keterangan FU"
        queryParams="fu_detail"
        options={fuDetail}
      />
      <SelectFilter
        label="Nama CRO"
        id="cro_name"
        placeholder="Pilih CRO"
        queryParams="cro_name"
        options={croNames}
      />
      <ComboBox
        options={motorcycles}
        label="Tipe Motor"
        id="motorcycle"
        placeholder="Pilih Tipe Motor"
        onSelect={() => {}}
        value="YZF R15"
      />
      <SelectFilter
        label="Hari Besar"
        id="religious_holiday"
        placeholder="Pilih Hari Besar"
        queryParams="religious_holiday"
        options={holidays}
      />
    </div>
  );
};

export default FollowUpFilters;
