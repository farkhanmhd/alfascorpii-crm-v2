'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';

type SelectCheckboxProps = {
  options: SelectOptions[];
  label: string;
  id: string;
  placeholder: string;
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
};

export const SelectCheckbox = ({
  options,
  label,
  id,
  placeholder,
  selectedValues,
  setSelectedValues,
}: SelectCheckboxProps) => {
  const handleCheckboxChange = (value: string) => {
    if (value === 'all') {
      // If 'all' is selected, toggle between all values and none
      if (selectedValues.includes('all')) {
        setSelectedValues([]);
      } else {
        setSelectedValues(options.map((opt) => opt.value));
      }
    } else {
      let newValues: string[];
      if (selectedValues.includes(value)) {
        // Removing a value
        newValues = selectedValues.filter((v) => v !== value && v !== 'all');
      } else {
        // Adding a value
        newValues = [...selectedValues.filter((v) => v !== 'all'), value];

        // Check if all options except 'all' are selected
        const nonAllOptions = options.filter((opt) => opt.value !== 'all');
        const allNonAllSelected = nonAllOptions.every((opt) =>
          newValues.includes(opt.value)
        );

        if (allNonAllSelected) {
          // If all other options are selected, include 'all' as well
          newValues = options.map((opt) => opt.value);
        }
      }
      setSelectedValues(newValues);
    }
  };

  const displayValue =
    selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : placeholder;

  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2 font-semibold">
          <span>{label}</span>
        </Label>
      )}
      <Select>
        <SelectTrigger
          className="border-black/30 bg-white text-xs font-semibold"
          id={id}
        >
          <SelectValue placeholder={displayValue} />
        </SelectTrigger>
        <SelectContent>
          <div className="flex flex-col gap-2 p-2">
            <MapItems
              of={options}
              render={(item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${id}-${item.value}`}
                    checked={selectedValues.includes(item.value)}
                    onCheckedChange={() => handleCheckboxChange(item.value)}
                  />
                  <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                </div>
              )}
            />
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCheckbox;
