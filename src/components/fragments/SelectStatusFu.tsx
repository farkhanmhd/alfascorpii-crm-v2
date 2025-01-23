import React from 'react';
import { SelectOptions } from '@/types';
import { SelectBox } from '../elements/form/Select';

type Props = {
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  statuses: SelectOptions[];
};

const SelectStatusFu = ({
  selectedStatus,
  setSelectedStatus,
  statuses,
}: Props) => {
  return (
    <SelectBox
      options={statuses}
      label="Status Follow Up"
      id="status_fu_id"
      placeholder="Pilih Status FU"
      value={selectedStatus}
      setValue={setSelectedStatus}
    />
  );
};

export default SelectStatusFu;
