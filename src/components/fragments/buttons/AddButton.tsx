'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const AddButton = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const createPath = `${pathname}/create`;

  return (
    <Button className="text-white" onClick={() => push(createPath)}>
      {children}
    </Button>
  );
};

export default AddButton;
