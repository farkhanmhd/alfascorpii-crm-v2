'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DialogContainerProps {
  title: string;
  children: React.ReactNode;
}

const DialogContainer = ({ title, children }: DialogContainerProps) => {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="w-[90vw] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogContainer;
