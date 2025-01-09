'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import { Button } from '@/components/ui/button';
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
import { SelectBox } from '@/components/fragments/form/Select';
import TextInput from '@/components/fragments/form/TextInput';

type Props = {
  rowSelection: Record<string, boolean>;
};

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

const FollowUpFooter = ({ rowSelection }: Props) => {
  const { setActionDialog } = useActionDialog();

  const handleImportDialog = () => {
    setActionDialog({ create: true });
  };

  const handleSendToCRO = () => {
    setActionDialog({ open: true });
  };

  return (
    <footer className="flex flex-col gap-4 pt-6 sm:flex-row">
      <Button onClick={handleImportDialog} variant="blue">
        Import Data
      </Button>
      {Object.keys(rowSelection).length === 0 ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Random Assign</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-y-8">
            <DialogHeader>
              <DialogTitle>Random Assign to CRO</DialogTitle>
            </DialogHeader>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Send to CRO</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button onClick={handleSendToCRO}>Send to CRO</Button>
      )}
    </footer>
  );
};

export default FollowUpFooter;
