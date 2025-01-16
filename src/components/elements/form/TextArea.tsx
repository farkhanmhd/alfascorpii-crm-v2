import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  className?: string;
  error?: string[];
  hideLabel?: boolean;
}

const TextField = ({
  label,
  id,
  className,
  error,
  hideLabel,
  ...props
}: TextFieldProps) => {
  return (
    <div className="flex h-full flex-col gap-y-4">
      <Label
        htmlFor={id}
        className={cn('flex gap-x-2', {
          'sr-only': hideLabel,
        })}
      >
        <span>{label}</span>
        {error && error.length > 0 && (
          <span className="text-red-500">
            {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
          </span>
        )}
      </Label>
      <Textarea
        id={id}
        name={id}
        autoComplete="off"
        {...props}
        className={cn({ 'ring-red-500': error }, className)}
      />
    </div>
  );
};

export default TextField;
