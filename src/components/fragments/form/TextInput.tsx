import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string[];
  hideLabel?: boolean;
}

const TextInput = ({
  label,
  id,
  error,
  hideLabel,
  ...props
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Label
        htmlFor={id}
        className={cn('flex gap-x-2', {
          'sr-only': hideLabel,
        })}
      >
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
        autoComplete="off"
        {...props}
        className={cn({ 'ring-red-500': error })}
      />
    </div>
  );
};

export default TextInput;
