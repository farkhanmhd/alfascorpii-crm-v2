import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import { SelectBox } from '@/components/fragments/form/Select';
import TextInput from '@/components/fragments/form/TextInput';

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

export const RandomAssignDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Random Assign</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Random Assign to CRO</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-y-4">
          <TextInput
            label="Jumlah Follow Up yang akan diberikan"
            id="amount"
            placeholder="Jumlah Follow Up"
            error={[]}
            inputMode="numeric"
          />
          <SelectBox
            options={croOptions}
            label="Pilih CRO"
            id="cro"
            placeholder="Select CRO"
            error={[]}
            value=""
            setValue={() => ''}
          />
        </div>
        <DialogFooter className="mt-4">
          <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send to CRO</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SendCroDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send to CRO</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Send Follow UP To CRO</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <SelectBox
            options={croOptions}
            label="Pilih CRO"
            id="cro"
            placeholder="Select CRO"
            value=""
            setValue={() => ''}
          />
        </div>
        <DialogFooter className="mt-4">
          <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Send</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
