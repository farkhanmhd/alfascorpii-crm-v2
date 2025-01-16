'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { SelectOptions } from '@/types';
import { getAllUsers } from '@/app/lib/actions/staff';
import { SelectBox } from '../elements/form/Select';

type Props = {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
};

const SelectCro = ({ selectedUser, setSelectedUser }: Props) => {
  const { execute, result } = useAction(getAllUsers);
  const [users, setUsers] = useState<SelectOptions[]>([]);

  useEffect(() => {
    if (result?.data) {
      setUsers(result.data);
    }
  }, [result.data]);

  useEffect(() => {
    execute();
  }, []);

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
