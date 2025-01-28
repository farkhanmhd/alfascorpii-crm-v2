'use client';

import React, { useState } from 'react';
import { ComboBoxOptions } from '@/types';
import ComboBox from '@/components/elements/form/ComboBox';
import { SelectBox } from '@/components/elements/form/Select';

type Props = {
  dealers: ComboBoxOptions[];
};

const statusFilters: ComboBoxOptions[] = [
  {
    label: 'Semua',
    value: 'all',
  },
  {
    label: 'Aktif',
    value: 'active',
  },
  {
    label: 'Tidak Aktif',
    value: 'inactive',
  },
];

const UserFilter = ({ dealers }: Props) => {
  const [dealerId, setDealerId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  return (
    <div className="flex gap-x-4">
      <ComboBox
        id="dealer_area"
        placeholder="Pilih Dealer/Area"
        options={dealers}
        value={dealerId}
        onSelect={setDealerId}
      />
      <SelectBox
        id="status"
        options={statusFilters}
        value={status}
        setValue={setStatus}
        placeholder="Pilih Status"
      />
    </div>
  );
};

export default UserFilter;
