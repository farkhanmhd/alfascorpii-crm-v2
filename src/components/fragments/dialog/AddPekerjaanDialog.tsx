'use client';

import React, { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCreateDialog from '@/hooks/useCreateDialog';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { addNewPekerjaan } from '@/app/lib/actions';
import { useToast } from '@/hooks/use-toast';

const AddPekerjaanDialog = () => {
  const { createDialog, setCreateDialog } = useCreateDialog();
  const { execute, hasSucceeded, result } = useAction(addNewPekerjaan);
  const { toast } = useToast();

  const togglePekerjaanDialog = () => {
    setCreateDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: !prevState.pekerjaan.open,
      },
    }));
  };

  useEffect(() => {
    if (hasSucceeded) {
      setCreateDialog((prevState) => ({
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
        title: 'Success',
        description: 'Pekerjaan added successfully',
        variant: 'default',
        duration: 3000,
      });
    }
  }, [hasSucceeded, setCreateDialog, toast]);

  return (
    <Dialog
      open={createDialog.pekerjaan.open}
      onOpenChange={togglePekerjaanDialog}
    >
      <DialogContent className="rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Pekerjaan</DialogTitle>
        </DialogHeader>

        <form action={execute}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pekerjaan" className="text-right">
                Pekerjaan
              </Label>
              <Input
                id="pekerjaan"
                name="pekerjaan"
                className="col-span-3"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kode" className="text-right">
                Kode
              </Label>
              <Input
                id="kode"
                name="kode"
                className="col-span-3"
                autoComplete="off"
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
        {result?.validationErrors?.pekerjaan &&
          result?.validationErrors?.pekerjaan?._errors?.map((error: string) => (
            <span className="text-sm text-red-500">{error}</span>
          ))}
        {result?.validationErrors?.kode &&
          result?.validationErrors?.kode?._errors?.map((error: string) => (
            <span className="text-sm text-red-500">{error}</span>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default AddPekerjaanDialog;
