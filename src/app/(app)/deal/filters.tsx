'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { getMotorcycleList } from '@/app/lib/actions/motorcycles';
import { getDealerList } from '@/app/lib/actions/dealers';
import { SelectFilter } from '@/components/elements/form/Select';
import DatePicker from '@/components/elements/form/DatePicker';
import ComboBox from '@/components/elements/form/AsyncComboBox';
import { ComboBoxOptions, SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import DealDialog from '@/components/elements/dialogs/deal-dialog';

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

const DealFilters = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [dateOption, setDateOption] = useState<string>('purchase_date');
  const [fuOption, setFuOption] = useState<string>('all');
  const [croName, setCroName] = useState<string>('all');
  const [motorcycleInput, setMotorcycleInput] = useState<string>('');
  const [motorcycleOptions, setMotorcycleOptions] = useState<ComboBoxOptions[]>(
    []
  );
  const [dealerOptions, setDealerOptions] = useState<ComboBoxOptions[]>([]);
  const [dealerInput, setDealerInput] = useState<string>('');

  const { execute, result, isPending } = useAction(() => {
    return getMotorcycleList({ search: motorcycleInput });
  });

  const {
    execute: executeDealer,
    result: resultDealer,
    isPending: isPendingDealer,
  } = useAction(() => {
    return getDealerList({ search: dealerInput });
  });

  const handleMotorcycleSearch = useDebouncedCallback((term: string) => {
    execute({ search: term });
    setIsTyping(false);
  }, 300);

  const handleDealerSearch = useDebouncedCallback((term: string) => {
    executeDealer({ search: term });
    setIsTyping(false);
  }, 300);

  const onMotorcycleChange = (term: string) => {
    setIsTyping(true);
    setMotorcycleInput(term);
    handleMotorcycleSearch(term);
  };

  const onDealerChange = (term: string) => {
    setIsTyping(true);
    setDealerInput(term);
    handleDealerSearch(term);
  };

  useEffect(() => {
    handleMotorcycleSearch(motorcycleInput);
    handleDealerSearch(dealerInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result.data) {
      setMotorcycleOptions(result.data);
    }
  }, [result.data]);

  useEffect(() => {
    if (resultDealer.data) {
      setDealerOptions(resultDealer.data);
    }
  }, [resultDealer.data]);

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
      <DatePicker id="start_date" label="Tanggal Awal" />
      <DatePicker id="end_date" label="Tanggal Akhir" />
      <SelectFilter
        label="Data Source"
        id="fu_option"
        placeholder="Pilih Opsi FU"
        options={fuOptions}
        value={fuOption}
        setSelectedValue={setFuOption}
      />
      <SelectFilter
        label="Nama CRO"
        id="cro_name"
        placeholder="Pilih Keterangan FU"
        options={croNames}
        value={croName}
        setSelectedValue={setCroName}
      />
      <ComboBox
        options={motorcycleOptions}
        label="Tipe Motor"
        id="motorcycle"
        placeholder="Pilih Tipe Motor"
        value={motorcycleInput}
        onSelect={setMotorcycleInput}
        inputValue={motorcycleInput}
        onValueChange={(search) => onMotorcycleChange(search)}
        isPendingResult={isTyping || isPending}
      />
      <ComboBox
        label="Dealer / Area"
        id="dealer_area"
        placeholder="Pilih Dealer/Area"
        options={dealerOptions}
        value={dealerInput}
        onSelect={setDealerInput}
        inputValue={dealerInput}
        onValueChange={(search) => onDealerChange(search)}
        isPendingResult={isTyping || isPendingDealer}
      />
      <SelectFilter
        label="Tipe Deal"
        id="fu_option"
        placeholder="Pilih Opsi FU"
        options={fuOptions}
        value={fuOption}
        setSelectedValue={setFuOption}
      />
      <div className="col-span-1 flex items-end gap-2 lg:col-span-1">
        <Button className="w-full">Filter</Button>
        <DealDialog />
      </div>
    </div>
  );
};

export default DealFilters;
