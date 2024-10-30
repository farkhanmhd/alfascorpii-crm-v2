import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string[];
}

const TextInput = ({ label, id, error, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Label htmlFor={id} className="flex gap-x-2">
        <span>{label}</span>
        {error && (
          <span className="text-red-500">
            {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
          </span>
        )}
      </Label>
      <Input
        id={id}
        name={id}
        className="col-span-3"
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

export default TextInput;
