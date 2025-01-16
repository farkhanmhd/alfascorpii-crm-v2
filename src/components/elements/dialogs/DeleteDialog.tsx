'use client';

import React from 'react';
import { useDeleteDialog } from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  title: string;
  isPending: boolean;
  deleteAction: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  deleteAction,
  isPending,
}) => {
  const { deleteDialog, setDeleteDialog } = useDeleteDialog();
  const handleClose = () => {
    setDeleteDialog(null);
  };
  return (
    <Dialog open={deleteDialog?.open} onOpenChange={handleClose}>
      <DialogContent className="w-[90vw] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-8">
          <p className="text-sm font-semibold">
            Apakah Anda yakin ingin menghapus item ini?
          </p>
          <div className="flex gap-x-4 self-end">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
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
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
