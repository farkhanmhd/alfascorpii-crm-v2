'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useActionDialog } from '@/hooks';

interface ActionDialogContainerProps {
  title: string;
  children: React.ReactNode;
}

const ActionDialogContainer = ({
  title,
  children,
}: ActionDialogContainerProps) => {
  const { actionDialog, handleClose } = useActionDialog<unknown>();

  return (
    <Dialog
      open={actionDialog?.create || actionDialog?.edit}
      onOpenChange={handleClose}
    >
      <DialogContent className="w-[90vw] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialogContainer;
