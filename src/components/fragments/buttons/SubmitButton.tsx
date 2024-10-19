'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full text-white" disabled={pending}>
      {pending ? 'Loading...' : 'Submit'}
    </Button>
  );
};

export default SubmitButton;
