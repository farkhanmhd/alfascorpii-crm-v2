'use client';

import React, { useState } from 'react';
import { manualAssignDuplicateAction } from '@/app/lib/actions/duplicate';
import SelectCro from '@/components/fragments/SelectCro';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { SelectOptions } from '@/types';
import { useDuplicateSelection } from './DuplicateTableData';

type Props = {
  selectedRows: Record<string, boolean>;
  users: SelectOptions[];
};

export const ManualAssignDialog = ({ selectedRows, users }: Props) => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const selectedCustomers = Object.keys(selectedRows).map((id) => Number(id));
  const { setDuplicateSelection } = useDuplicateSelection();

  const { execute, isPending } = useAction(manualAssignDuplicateAction, {
    onSuccess: ({ data }) => {
      if (data?.status === 'success') {
        toast({
          title: 'Success',
          description: data?.message,
        });
        setOpen(false);
        setDuplicateSelection({});
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
        <Button variant="blue">Send to CRO</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Assign {selectedCustomers.length} Customers To CRO
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form
          action={() =>
            execute({ ids: selectedCustomers, user_id: selectedUser })
          }
        >
          <div className="mt-2">
            <SelectCro
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              users={users}
            />
          </div>
          <AlertDialogFooter className="mt-6">
            <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={isPending}>
                Send
              </Button>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
