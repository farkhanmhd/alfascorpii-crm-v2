'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  className?: string;
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  disabled?: boolean;
}

const SubmitButton = ({
  variant,
  className = '',
  children,
  disabled = false,
}: SubmitButtonProps) => (
  <Button
    type="submit"
    variant={variant}
    className={`${className}`}
    disabled={disabled}
  >
    {disabled ? (
      <span>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </span>
    ) : (
      children
    )}
  </Button>
);

export default SubmitButton;
