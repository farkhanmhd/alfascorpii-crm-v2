'use client';

import React, { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { usePathname, useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useDeleteDialog } from '@/hooks';
import { Button } from '@/components/ui/button';
import { removePekerjaan } from '@/app/lib/actions/customers/pekerjaan';

const DeletePekerjaanDialog = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { deleteDialog, setDeleteDialog } = useDeleteDialog();
  const { execute, hasSucceeded } = useAction(removePekerjaan);
  const { toast } = useToast();

  const togglePekerjaanDialog = () => {
    setDeleteDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: !prevState.pekerjaan.open,
      },
    }));
  };

  useEffect(() => {
    if (hasSucceeded) {
      setDeleteDialog((prevState) => ({
        ...prevState,
        pekerjaan: {
          ...prevState.pekerjaan,
          open: false,
          id: '',
          pekerjaan: '',
          kode: '',
        },
      }));
      toast({
        title: 'Deleted',
        description: 'Pekerjaan deleted successfully',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }, [hasSucceeded, setDeleteDialog, toast]);

  useEffect(() => {
    if (!deleteDialog.pekerjaan.open) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('id');
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  }, [deleteDialog.pekerjaan.open, pathname, router]);

  return (
    <AlertDialog
      open={deleteDialog.pekerjaan.open}
      onOpenChange={togglePekerjaanDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this data
            from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              execute({
                id: deleteDialog.pekerjaan.id,
              })
            }
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePekerjaanDialog;
