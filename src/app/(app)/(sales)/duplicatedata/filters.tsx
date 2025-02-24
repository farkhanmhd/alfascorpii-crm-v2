'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { SelectFilter } from '@/components/elements/form/Select';
import DatePicker from '@/components/elements/form/DatePicker';
import { ComboBoxOptions, SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import SelectCro from '@/components/fragments/SelectCro';
import ComboBox from '@/components/elements/form/ComboBox';

const dateOptions: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Tanggal Pembelian', value: 'purchase_date' },
  { label: 'Tanggal Follow Up', value: 'follow_up_date' },
  { label: 'Tanggal Assign', value: 'assigned_date' },
  { label: 'Tanggal Lahir', value: 'date_of_birth' },
];

type Props = {
  users: SelectOptions[];
  motorcycles: ComboBoxOptions[];
  dealers: ComboBoxOptions[];
};

const DuplicateFilters = ({
  users = [],
  motorcycles = [],
  dealers = [],
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [dateOption, setDateOption] = useState<string>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [croName, setCroName] = useState<string>(users[0].value || '');
  const [motorcycleId, setMotorcycleId] = useState<string>(
    searchParams.get('motorcycle_id') || ''
  );
  const [dealerId, setDealerId] = useState<string>(
    searchParams.get('dealer_id') || ''
  );

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (croName === 'all') {
      params.delete('user_id');
    } else {
      params.set('user_id', croName);
    }

    if (motorcycleId) {
      params.set('motorcycle_id', motorcycleId);
    } else {
      params.delete('motorcycle_id');
    }

    if (dealerId) {
      params.set('dealer_id', dealerId);
    } else {
      params.delete('dealer_id');
    }

    if (dateOption !== 'all') {
      params.set('date_field', dateOption);

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
    } else {
      params.delete('date_field');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setCroName(users[0].value || '');
    setMotorcycleId('');
    setDealerId('');
    setDateOption('all');
    replace(pathname);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
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
      <SelectCro
        users={users}
        selectedUser={croName}
        setSelectedUser={setCroName}
      />
      <ComboBox
        options={motorcycles}
        label="Tipe Motor"
        id="motorcycle"
        placeholder="Pilih Tipe Motor"
        value={motorcycleId}
        onSelect={setMotorcycleId}
      />
      <ComboBox
        label="Dealer / Area"
        id="dealer_area"
        placeholder="Pilih Dealer/Area"
        options={dealers}
        value={dealerId}
        onSelect={setDealerId}
      />
      <div className="flex items-end gap-x-2">
        <Button className="w-full self-end" onClick={handleFilter}>
          Filter
        </Button>
        <div className="flex w-full items-end gap-2">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateFilters;
