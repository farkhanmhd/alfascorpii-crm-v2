'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SelectFilter } from '@/components/elements/form/Select';
import DatePicker from '@/components/elements/form/DatePicker';
import ComboBox from '@/components/elements/form/ComboBox';
import { ComboBoxOptions, OptionsProps, SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import DealDialog from '@/components/elements/dialogs/deal-dialog';
import { format } from 'date-fns';
import ClearFilters from '@/components/elements/buttons/ClearFilters';

const dateOptions: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Tanggal Pembelian', value: 'purchase_date' },
  { label: 'Tanggal Follow Up', value: 'follow_up_date' },
  { label: 'Tanggal Assign', value: 'assigned_date' },
  { label: 'Tanggal Lahir', value: 'date_of_birth' },
];

interface Props extends OptionsProps {
  dataSourceOpts: ComboBoxOptions[];
  userOpts: ComboBoxOptions[];
}

const dealTypeOptions: ComboBoxOptions[] = [
  {
    label: 'Semua',
    value: 'all',
  },
  {
    label: 'Unit RO',
    value: 'unit_ro',
  },
  {
    label: 'Unit Ref',
    value: 'unit_ref',
  },
  {
    label: 'Unit NC',
    value: 'unit_nc',
  },
  {
    label: 'Service',
    value: 'service',
  },
  {
    label: 'Spare Part',
    value: 'sparepart',
  },
];

const DealFilters = ({ ...props }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [dateOption, setDateOption] = useState<string>('purchase_date');
  const [dealType, setDealType] = useState<string>('all');
  const [croName, setCroName] = useState<string>('all');
  const [motorcycle, setMotorcycle] = useState<string>('all');
  const [dealer, setDealer] = useState<string>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (croName === 'all') {
      params.delete('user_id');
    } else {
      params.set('user_id', croName);
    }

    if (motorcycle) {
      params.set('motorcycle_id', motorcycle);
    } else {
      params.delete('motorcycle_id');
    }

    if (dealer) {
      params.set('dealer_id', dealer);
    } else {
      params.delete('dealer_id');
    }

    if (dateOption !== 'all') {
      params.set('date_field', dateOption);
    } else {
      params.delete('date_field');
    }

    if (startDate) {
      params.set('date_from', format(startDate, 'yyyy-MM-dd'));
    } else {
      params.delete('date_from');
    }

    if (endDate) {
      params.set('date_to', format(endDate, 'yyyy-MM-dd'));
    } else {
      params.delete('date_to');
    }

    if (dealType !== 'all') {
      params.set('deal_type', dealType);
    } else {
      params.delete('deal_type');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(225px,_1fr))] gap-6">
      <SelectFilter
        label="Opsi Tanggal"
        id="date_option"
        placeholder="Pilih Opsi Tanggal"
        options={dateOptions}
        value={dateOption}
        setSelectedValue={setDateOption}
      />
      <DatePicker
        id="start_date"
        label="Tanggal Awal"
        date={startDate}
        setDate={setStartDate}
      />
      <DatePicker
        id="end_date"
        label="Tanggal Akhir"
        date={endDate}
        setDate={setEndDate}
      />
      <SelectFilter
        label="Nama CRO"
        id="cro_name"
        placeholder="Pilih Keterangan FU"
        options={props.userOpts}
        value={croName}
        setSelectedValue={setCroName}
      />
      <ComboBox
        options={props.motorcyclesOpts}
        label="Tipe Motor"
        id="motorcycle"
        placeholder="Pilih Tipe Motor"
        value={motorcycle}
        onSelect={setMotorcycle}
      />
      <ComboBox
        label="Dealer / Area"
        id="dealer_area"
        placeholder="Pilih Dealer/Area"
        options={props.dealerOpts}
        value={dealer}
        onSelect={setDealer}
      />
      <SelectFilter
        label="Tipe Deal"
        id="deal_option"
        placeholder="Pilih Opsi Deal"
        options={dealTypeOptions}
        value={dealType}
        setSelectedValue={setDealType}
      />
      <div className="flex items-end gap-x-2">
        <Button className="w-full self-end" onClick={handleFilter}>
          Filter
        </Button>
        <ClearFilters />
      </div>
      <DealDialog {...props} />
    </div>
  );
};

export default DealFilters;
