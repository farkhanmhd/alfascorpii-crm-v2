'use client';

import React, { useState, useEffect } from 'react';
import { getAllUsersAction } from '@/app/lib/actions/staff';
import { randomAssignFollowUpAction } from '@/app/lib/actions/follow-up';
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
import { SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import { SelectBox } from '@/components/fragments/form/Select';
import NumericInput from '@/components/NumericInput';

export const RandomAssignDialog = () => {
  const { execute, isPending, result } = useAction(getAllUsersAction);
  const { execute: randomAssign, isPending: isRandomPending } = useAction(
    randomAssignFollowUpAction,
    {
      onSuccess: ({ data }) => {
        if (data?.status === 'success') {
          toast({
            title: 'Success',
            description: data?.message,
          });
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

  const [users, setUsers] = useState<SelectOptions[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (result?.data) {
      setUsers(result.data);
      if (result.data.length > 0 && !selectedUser) {
        setSelectedUser(result.data[0].value);
      }
    }
  }, [result?.data]);

  const handleFetchUsers = () => {
    execute();
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={handleFetchUsers}>Random Assign</Button>
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
            <SelectBox
              options={users}
              label="Pilih CRO"
              id="cro"
              placeholder="Select CRO"
              error={[]}
              value={selectedUser}
              setValue={setSelectedUser}
              isPendingResult={isPending}
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

export const SendCroDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Send to CRO</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Send Follow UP To CRO</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="mt-2">
          <SelectBox
            options={croOptions}
            label="Pilih CRO"
            id="cro"
            placeholder="Select CRO"
            value=""
            setValue={() => ''}
            isPendingResult
          />
        </div>
        <AlertDialogFooter className="mt-4">
          <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <Button>Send</Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
