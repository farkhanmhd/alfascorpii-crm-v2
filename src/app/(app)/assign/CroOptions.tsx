'use client';

import React, { useState } from 'react';
import ComboBox from '@/components/fragments/form/ComboBox';

interface Props {
  options: { value: string; label: string }[];
}

const CroOptions = ({ options }: Props) => {
  const [value, setValue] = useState('');
  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
  };
  return (
    <ComboBox
      id="cro"
      value={value}
      placeholder="Select a CRO"
      options={options}
      error={[]}
      onSelect={handleSelect}
    />
  );
};

export default CroOptions;
