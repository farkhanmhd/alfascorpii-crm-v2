'use client';

import React, { useState } from 'react';
import { deleteDuplicateAction } from '@/app/lib/actions/duplicate';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';

type DeleteProps = {
  selectedRows: Record<string, boolean>;
  setSelectedRows: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

export const DeleteDuplicateDialog = ({
  selectedRows,
  setSelectedRows,
}: DeleteProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const selectedCustomers = Object.keys(selectedRows).map((id) => Number(id));

  const { execute, isPending } = useAction(deleteDuplicateAction, {
    onSuccess: ({ data }) => {
      if (data?.status === 'success') {
        toast({
          title: 'Success',
          description: data?.message,
        });
        setOpen(false);
        setSelectedRows({});
      } else {
        toast({
          title: 'Error',
          description: data?.message,
          variant: 'destructive',
        });
      }
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {selectedCustomers.length} Duplicates
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-muted-foreground">
          Are you sure you want to delete {selectedCustomers.length} duplicate?
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-6">
          <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => execute({ ids: selectedCustomers })}
            >
              Delete
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
