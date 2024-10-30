'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

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
    className={`text-white ${className}`}
    disabled={disabled}
  >
    {disabled ? 'Loading...' : children}
  </Button>
);

export default SubmitButton;
