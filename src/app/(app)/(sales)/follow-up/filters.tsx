'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { SelectFilter } from '@/components/elements/form/Select';
import DatePicker from '@/components/elements/form/DatePicker';
import { ComboBoxOptions, SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import SelectCro from '@/components/fragments/SelectCro';
import ComboBox from '@/components/elements/form/ComboBox';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { useFuUsers } from './FollowUpTableData';

const dateOptions: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Tanggal Pembelian', value: 'purchase_date' },
  { label: 'Tanggal Follow Up', value: 'follow_up_date' },
  { label: 'Tanggal Assign', value: 'assigned_date' },
  { label: 'Tanggal Lahir', value: 'date_of_birth' },
];

const fuStatus: SelectOptions[] = [
  { label: 'Semua', value: 'all' },
  { label: 'NON FU', value: 'non_fu' },
  { label: 'FU 1', value: 'fu_1' },
  { label: 'FU 2', value: 'fu_2' },
  { label: 'FU 3', value: 'fu_3' },
  { label: '> FU 3', value: 'fu_more_than_3' },
];

type Props = {
  users: SelectOptions[];
  motorcycles: ComboBoxOptions[];
  dealers: ComboBoxOptions[];
  fuDetails: SelectOptions[];
  fuResults: SelectOptions[];
};

const FollowUpFilters = ({
  users,
  motorcycles = [],
  dealers = [],
  fuDetails = [],
  fuResults = [],
}: Props) => {
  const searchParams = useSearchParams();
  const { setFuUsers } = useFuUsers();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [dateOption, setDateOption] = useState<string>('all');
  const [fuOption, setFuOption] = useState<string>('all');
  const [fuDetailValue, setFuDetailValue] = useState<string>('all');
  const [statusFu, setStatusFu] = useState<string>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [croName, setCroName] = useState<string>(users[0].value);
  const [motorcycleId, setMotorcycleId] = useState<string>(
    searchParams.get('motorcycle_id') || ''
  );
  const [dealerId, setDealerId] = useState<string>(
    searchParams.get('dealer_id') || ''
  );

  const { permissions } = usePermissions();

  const canViewUsers = checkPermission('view_user_list', permissions);

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

    if (statusFu !== 'all') {
      params.set('follow_up_status', statusFu);
    } else {
      params.delete('follow_up_status');
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
      params.delete('date_from');
      params.delete('date_to');
      setStartDate(undefined);
      setEndDate(undefined);
    }

    if (fuOption !== 'all') {
      params.set('follow_up_result_id', fuOption);
    } else {
      params.delete('follow_up_result_id');
    }

    if (fuDetailValue !== 'all') {
      params.set('follow_up_detail_id', fuDetailValue);
    } else {
      params.delete('follow_up_detail_id');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (users) {
      setFuUsers(users);
    }
  }, []);

  const handleClearFilters = () => {
    replace(pathname);
    setDateOption('all');
    setFuOption('all');
    setFuDetailValue('all');
    setStartDate(undefined);
    setEndDate(undefined);
    setCroName(users[0].value);
    setMotorcycleId('');
    setDealerId('');
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
      <SelectFilter
        label="Hasil FU"
        id="fu_option"
        placeholder="Pilih Opsi FU"
        options={fuResults}
        value={fuOption}
        setSelectedValue={setFuOption}
      />
      <SelectFilter
        label="Keterangan FU"
        id="fu_detail"
        placeholder="Pilih Keterangan FU"
        options={fuDetails}
        value={fuDetailValue}
        setSelectedValue={setFuDetailValue}
      />
      <SelectFilter
        label="Status FU"
        id="fu_status"
        placeholder="Pilih Status FU"
        options={fuStatus}
        value={statusFu}
        setSelectedValue={setStatusFu}
      />
      {canViewUsers && (
        <SelectCro
          users={users}
          selectedUser={croName}
          setSelectedUser={setCroName}
        />
      )}
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

export default FollowUpFilters;
