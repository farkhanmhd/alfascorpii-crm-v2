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

interface DeleteDialogProps {
  title: string;
  isPending: boolean;
  deleteAction: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: React.ReactNode;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  deleteAction,
  isPending,
  open,
  setOpen,
  trigger,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-y-8">
          <p className="text-sm font-semibold">
            Apakah Anda yakin ingin menghapus item ini?
          </p>
          <div className="flex gap-x-4 self-end">
            <AlertDialogCancel asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={deleteAction}
            >
              Delete
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
