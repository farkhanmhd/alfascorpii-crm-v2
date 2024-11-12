'use client';

import React, { useState } from 'react';
import ComboBox from '@/components/fragments/form/ComboBox';
import { ComboBoxOptions } from '@/types';

const Page = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const options: ComboBoxOptions[] = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Option 4', value: 'option-4' },
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <h1 className="mb-8">Username</h1>
      <ComboBox
        options={options}
        label={selectedValue || 'Choose an option'}
        placeholder="Select an option"
        onSelect={handleSelect}
        id="combo-box"
        value={selectedValue}
      />
    </div>
  );
};

export default Page;
