import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';

import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';

import { DataTable } from '@/components/elements/table/DataTable';
import { ICustomerFollowUp } from '@/types';
import columns from './fu-history-columns';

type Props = {
  followUps: ICustomerFollowUp[];
};

const FollowUpHistory = ({ followUps }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: 'orange' }))}>
        History Follow Up
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
