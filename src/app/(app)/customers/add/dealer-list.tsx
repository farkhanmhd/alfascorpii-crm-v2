import React from 'react';
import ComboBox from '@/components/fragments/form/ComboBox';

const DealerList = ({
  label,
  id,
  placeholder,
}: {
  label: string;
  id: string;
  placeholder: string;
}) => {
  const options = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ];

  return (
    <ComboBox
      label={label}
      placeholder={placeholder}
      id={id}
      options={options}
      value=""
      onSelect={() => {}}
    />
  );
};

export default DealerList;
