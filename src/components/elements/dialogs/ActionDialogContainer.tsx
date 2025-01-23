'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ActionDialogContainerProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const ActionDialogContainer = ({
  title,
  children,
  open,
  setOpen,
  trigger,
}: ActionDialogContainerProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] rounded-md">
        <div className="relative">
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
          </AlertDialogHeader>
          {children}
          <AlertDialogCancel asChild className="border-none">
            <Button
              size="icon"
              variant="ghost"
              className="absolute -right-2 -top-2"
            >
              <X />
            </Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionDialogContainer;
