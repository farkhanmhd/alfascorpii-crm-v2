import React from 'react';
import { SelectOptions } from '@/types';
import { SelectBox } from '../elements/form/Select';

type Props = {
  selectedMethod: string;
  setSelectedMethod: React.Dispatch<React.SetStateAction<string>>;
  methods: SelectOptions[];
};

const SelectFuMethod = ({
  selectedMethod,
  setSelectedMethod,
  methods,
}: Props) => {
  return (
    <SelectBox
      options={methods}
      label="Pilih Metode"
      id="method"
      placeholder="Select CRO"
      value={selectedMethod}
      setValue={setSelectedMethod}
    />
  );
};

export default SelectFuMethod;
