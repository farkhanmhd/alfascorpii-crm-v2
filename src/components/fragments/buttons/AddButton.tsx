'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useActionDialog } from '@/hooks';

const AddButton = ({ children }: { children: React.ReactNode }) => {
  const { setActionDialog } = useActionDialog<unknown>();

  return (
    <Button
      className="w-full sm:w-fit"
      variant="default"
      onClick={() => setActionDialog({ create: true })}
    >
      {children}
    </Button>
  );
};

export default AddButton;
