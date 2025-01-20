import React from 'react';
import { SelectOptions } from '@/types';
import { SelectBox } from '../elements/form/Select';

type Props = {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  users: SelectOptions[];
};

const SelectCro = ({ selectedUser, setSelectedUser, users }: Props) => {
  return (
    <SelectBox
      options={users}
      label="Pilih CRO"
      id="cro"
      placeholder="Select CRO"
      value={selectedUser}
      setValue={setSelectedUser}
    />
  );
};

export default SelectCro;
