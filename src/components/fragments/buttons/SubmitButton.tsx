'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

const SubmitButton = ({
  variant,
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      className={`text-white ${className}`}
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
