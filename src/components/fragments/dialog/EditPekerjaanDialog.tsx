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
import { useEditDialog } from '@/hooks';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { updatePekerjaan } from '@/app/lib/actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const EditPekerjaanDialog = () => {
  const { editDialog, setEditDialog } = useEditDialog();
  const { execute, hasSucceeded, result } = useAction(async (formData) => {
    const data = {
      id: editDialog.pekerjaan.id,
      pekerjaan: formData.get('pekerjaan'),
      kode: formData.get('kode'),
      status: formData.get('status'),
    };
    return updatePekerjaan(data);
  });
  const { toast } = useToast();

  const togglePekerjaanDialog = () => {
    setEditDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: !prevState.pekerjaan.open,
      },
    }));
  };

  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setEditDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        status: value,
      },
    }));
  };

  useEffect(() => {
    if (hasSucceeded) {
      setEditDialog((prevState) => ({
        ...prevState,
        pekerjaan: {
          ...prevState.pekerjaan,
          open: false,
        },
      }));
      toast({
        title: 'Success',
        description: 'Pekerjaan updated',
        variant: 'default',
        duration: 3000,
      });
    }
  }, [hasSucceeded, setEditDialog, toast]);

  return (
    <Dialog
      open={editDialog.pekerjaan.open}
      onOpenChange={togglePekerjaanDialog}
    >
      <DialogContent className="rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pekerjaan</DialogTitle>
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
                value={editDialog.pekerjaan.pekerjaan}
                onChange={(e) =>
                  setEditDialog((prevState) => ({
                    ...prevState,
                    pekerjaan: {
                      ...prevState.pekerjaan,
                      pekerjaan: e.target.value,
                    },
                  }))
                }
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
                value={editDialog.pekerjaan.kode}
                onChange={(e) =>
                  setEditDialog((prevState) => ({
                    ...prevState,
                    pekerjaan: {
                      ...prevState.pekerjaan,
                      kode: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <RadioGroup
                onValueChange={handleStatusChange}
                name="status"
                value={editDialog.pekerjaan.status}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="SHOW"
                    id="show"
                    checked={editDialog.pekerjaan.status === 'SHOW'}
                  />
                  <Label htmlFor="show">SHOW</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="HIDE"
                    id="hide"
                    checked={editDialog.pekerjaan.status === 'HIDE'}
                  />
                  <Label htmlFor="hide">HIDE</Label>
                </div>
              </RadioGroup>
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

export default EditPekerjaanDialog;
