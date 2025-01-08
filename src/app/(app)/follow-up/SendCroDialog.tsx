import React from 'react';
import { useActionDialog } from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { SelectOptions } from '@/types';
import { SelectBox } from '@/components/fragments/form/Select';
import { Button } from '@/components/ui/button';

const croOptions: SelectOptions[] = [
  {
    label: 'CRO 1',
    value: 'cro1',
  },
  {
    label: 'CRO 2',
    value: 'cro2',
  },
  {
    label: 'CRO 3',
    value: 'cro3',
  },
];

const SendCroDialog = () => {
  const { actionDialog, handleClose } = useActionDialog();
  return (
    <Dialog open={actionDialog?.open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Follow UP To CRO</DialogTitle>
        </DialogHeader>
        <SelectBox
          options={croOptions}
          label="Pilih CRO"
          id="cro"
          placeholder="Select CRO"
          value=""
          setValue={() => ''}
        />
        <DialogFooter className="mt-8">
          <div className="flex w-full justify-between gap-x-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="w-24" onClick={handleClose}>
              Send
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendCroDialog;
