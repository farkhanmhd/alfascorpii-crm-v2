'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { getMotorcycleList } from '@/app/lib/actions/motorcycles';
import { getDealerList } from '@/app/lib/actions/dealers';
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

type Props = {
  users: SelectOptions[];
};

const FollowUpFilters = ({ users }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [dateOption, setDateOption] = useState<string>('');
  const [fuOption, setFuOption] = useState<string>('all');
  const [fuDetailValue, setFuDetailValue] = useState<string>('all');
  const [croName, setCroName] = useState<string>(users[0].value);
  const [motorcycleInput, setMotorcycleInput] = useState<string>('');
  const [motorcycleId, setMotorcycleId] = useState<string>('');
  const [motorcycleOptions, setMotorcycleOptions] = useState<ComboBoxOptions[]>(
    []
  );
  const [dealerOptions, setDealerOptions] = useState<ComboBoxOptions[]>([]);
  const [dealerId, setDealerId] = useState<string>('');
  const [dealerInput, setDealerInput] = useState<string>('');

  const { execute, isPending } = useAction(getMotorcycleList, {
    onSuccess: (data) => {
      if (data.data) {
        setMotorcycleOptions(data.data);
      }
    },
  });

  const { execute: executeDealer, isPending: isPendingDealer } = useAction(
    getDealerList,
    {
      onSuccess: (data) => {
        if (data.data) {
          setDealerOptions(data.data);
        }
      },
    }
  );

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
    execute({ search: motorcycleInput });
    executeDealer({ search: dealerInput });
  }, []);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (croName === 'all') {
      params.delete('user_id');
    } else {
      params.set('user_id', croName);
    }

    if (motorcycleId !== '') {
      params.set('motorcycle_id', motorcycleId);
    } else {
      params.delete('motorcycle_id');
    }

    replace(`${pathname}?${params.toString()}`);
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
      <DatePicker id="start_date" label="Tanggal Awal" />
      <DatePicker id="end_date" label="Tanggal Akhir" />
      <SelectFilter
        label="Follow Up"
        id="fu_option"
        placeholder="Pilih Opsi FU"
        options={fuOptions}
        value={fuOption}
        setSelectedValue={setFuOption}
      />
      <SelectFilter
        label="Keterangan Follow UP"
        id="fu_detail"
        placeholder="Pilih Keterangan FU"
        options={fuDetail}
        value={fuDetailValue}
        setSelectedValue={setFuDetailValue}
      />
      <SelectCro
        users={users}
        selectedUser={croName}
        setSelectedUser={setCroName}
      />
      <ComboBox
        options={motorcycleOptions}
        label="Tipe Motor"
        id="motorcycle"
        placeholder="Pilih Tipe Motor"
        value={motorcycleId}
        onSelect={setMotorcycleId}
        inputValue={motorcycleInput}
        onValueChange={(search: string) => onMotorcycleChange(search)}
        isPendingResult={isTyping || isPending}
      />
      <ComboBox
        label="Dealer / Area"
        id="dealer_area"
        placeholder="Pilih Dealer/Area"
        options={dealerOptions}
        value={dealerId}
        onSelect={setDealerId}
        inputValue={dealerInput}
        onValueChange={(search: string) => onDealerChange(search)}
        isPendingResult={isTyping || isPendingDealer}
      />
      <Button className="w-max self-end" onClick={handleFilter}>
        Filter
      </Button>
    </div>
  );
};

export default FollowUpFilters;
