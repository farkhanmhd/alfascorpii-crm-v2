'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const AddButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button className="w-fit" variant="default">
      {children}
    </Button>
  );
};

export default AddButton;
