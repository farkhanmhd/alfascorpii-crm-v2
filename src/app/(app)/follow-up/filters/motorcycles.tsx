'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
// import { useDebouncedCallback } from 'use-debounce';
import ComboBox from '@/components/fragments/form/ComboBox';
import { getMotorcycleList } from '@/app/lib/actions/motorcycles';

interface Props {
  motorcycle: string;
  setMotorcycle: (motorcycle: string) => void;
}

export const MotorcyclesFilter = ({ motorcycle, setMotorcycle }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const {
    // execute,
    result,
    isPending,
  } = useAction(() => {
    return getMotorcycleList({ search: inputValue });
  });

  // Call a function to trigger a server action when the search value changes
  // const handleValueChange = (newValue) => {
  //   setSearch(newValue)
  //   triggerServerAction(newValue)
  // }

  const motorcycles = result.data;

  return (
    <ComboBox
      options={motorcycles}
      label="Tipe Motor"
      id="motorcycle"
      placeholder="Pilih Tipe Motor"
      value={motorcycle}
      onSelect={setMotorcycle}
      inputValue={inputValue}
      onValueChange={setInputValue}
      isPendingResult={isPending}
    />
  );
};

export default MotorcyclesFilter;
