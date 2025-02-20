'use client';

import React, { useState } from 'react';
import {
  randomAssignFollowUpAction,
  manualAssignFollowUpAction,
} from '@/app/lib/actions/follow-up';
import { useAction } from 'next-safe-action/hooks';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import NumericInput from '@/components/NumericInput';
import SelectCro from '@/components/fragments/SelectCro';
import { SelectOptions } from '@/types';
import { useFuSelection } from '../FollowUpTableData';

type RandomProps = {
  users: SelectOptions[];
};

export const RandomAssignDialog = ({ users }: RandomProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { execute: randomAssign, isPending: isRandomPending } = useAction(
    randomAssignFollowUpAction,
    {
      onSuccess: ({ data }) => {
        if (data?.status === 'success') {
          toast({
            title: 'Success',
            description: data?.message,
          });
          setOpen(false);
        } else {
          toast({
            title: 'Error',
            description: data?.message,
            variant: 'destructive',
          });
        }
      },
    }
  );

  const [selectedUser, setSelectedUser] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Random Assign</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={() => randomAssign({ amount, user_id: selectedUser })}
          className="flex flex-col gap-y-4"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Random Assign to CRO</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="mt-2 flex flex-col gap-y-6">
            <NumericInput
              label="Jumlah Follow Up yang akan diberikan"
              value={amount}
              setValue={setAmount}
              id="amount"
              error={[]}
            />
            <SelectCro
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              users={users}
            />
          </div>
          <AlertDialogFooter className="mt-4">
            <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={isRandomPending}>
                Send
              </Button>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  selectedRows: Record<string, boolean>;
  users: SelectOptions[];
};

export const SendCroDialog = ({ selectedRows, users }: Props) => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const selectedCustomers = Object.keys(selectedRows).map((id) => Number(id));
  const { setFuSelection } = useFuSelection();

  const { execute, isPending } = useAction(manualAssignFollowUpAction, {
    onSuccess: ({ data }) => {
      if (data?.status === 'success') {
        toast({
          title: 'Success',
          description: data?.message,
        });
        setOpen(false);
        setFuSelection({});
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
        <Button>Send to CRO</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Assign {selectedCustomers.length} Customers To CRO
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form
          action={() =>
            execute({ customerIds: selectedCustomers, user_id: selectedUser })
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
