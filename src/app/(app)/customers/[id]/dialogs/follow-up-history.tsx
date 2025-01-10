import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';

import { DataTable } from '@/components/fragments/table/DataTable';
import { ICustomerFollowUp } from '@/types';
import columns from './fu-history-columns';

type Props = {
  followUps: ICustomerFollowUp[];
};

const FollowUpHistory = ({ followUps }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="orange">History Follow Up</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="px-2">
          <DialogTitle>History Follow Up</DialogTitle>
        </DialogHeader>
        <ScrollArea className="rounded-md border">
          <DataTable columns={columns} data={followUps} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpHistory;
