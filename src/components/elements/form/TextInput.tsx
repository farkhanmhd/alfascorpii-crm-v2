import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClass?: string;
  id: string;
  error?: string[];
  hideLabel?: boolean;
  className?: string;
}

const TextInput = ({
  labelClass,
  label,
  id,
  error,
  hideLabel,
  className,
  ...props
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Label
        htmlFor={id}
        className={cn(`flex gap-x-2 font-semibold ${labelClass}`, {
          'sr-only': hideLabel,
        })}
      >
        <span>{label}</span>
        {error && (
          <span className="text-red-500">
            {error.map((errMsg) => `${errMsg}`).join(', ') || '*'}
          </span>
        )}
      </Label>
      <Input
        id={id}
        name={id}
        autoComplete="off"
        {...props}
        className={cn(className, {
          'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20':
            error?.length,
        })}
      />
    </div>
  );
};

export default TextInput;

export const InputDemo = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-06">Input with error</Label>
      <Input
        id="input-06"
        className="border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
        placeholder="Email"
        type="email"
        defaultValue="invalid@email.com"
      />
      <p
        className="mt-2 text-xs text-destructive"
        role="alert"
        aria-live="polite"
      >
        Email is invalid
      </p>
    </div>
  );
};

export const InputDemo2 = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-01">Simple input</Label>
      <Input id="input-01" placeholder="Email" type="email" />
    </div>
  );
};
