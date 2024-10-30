'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  action: () => void;
  isPending: boolean;
}

const DeleteDialog = ({ action, isPending }: DeleteDialogProps) => {
  const { back } = useRouter();
  return (
    <div className="flex flex-col gap-y-8">
      <p className="text-sm font-semibold">
        Apakah Anda yakin ingin menghapus item ini?
      </p>
      <div className="flex gap-x-4 self-end">
        <Button type="button" variant="secondary" onClick={back}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={action}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteDialog;
