'use client';

import React from 'react';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface StatusRadioProps {
  statusValue: 'SHOW' | 'HIDE';
  onValueChange: (value: 'SHOW' | 'HIDE') => void;
}

const StatusRadio = ({ statusValue, onValueChange }: StatusRadioProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 text-sm font-medium">
        <span>Status</span>
        <span className="text-red-500">*</span>
      </div>
      <RadioGroup
        name="status"
        value={statusValue}
        onValueChange={onValueChange}
        className="flex gap-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="SHOW"
            id="show"
            checked={statusValue === 'SHOW'}
          />
          <Label htmlFor="show">SHOW</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="HIDE"
            id="hide"
            checked={statusValue === 'HIDE'}
          />
          <Label htmlFor="hide">HIDE</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default StatusRadio;
