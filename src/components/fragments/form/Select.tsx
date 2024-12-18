import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import { Label } from '@/components/ui/label';

interface Props {
  options: SelectOptions[];
  id: string;
  label: string;
  placeholder: string;
  error?: string[];
}

const SelectBox = ({ options, label, error, id, placeholder }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2">
          <span>{label}</span>
          {error && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
            </span>
          )}
        </Label>
      )}
      <Select>
        <SelectTrigger className="w-full" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <MapItems
            of={options}
            render={(item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          />
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBox;
