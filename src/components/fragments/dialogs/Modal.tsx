import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ModalProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ label, title, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
