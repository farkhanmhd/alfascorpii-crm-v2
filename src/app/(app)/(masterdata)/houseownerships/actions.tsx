'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addHouseOwnershipAction,
  editHouseOwnershipAction,
  removeHouseOwnershipAction,
} from '@/app/lib/actions/houseownerships';
import { actionResponseToast } from '@/lib/utils';
import HouseOwnershipForm from './HouseOwnershipForm';

export const CreateHouseOwnershipDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        house_ownership_status: formData.get('house_ownership_status'),
        status: formData.get('status'),
      };
      return addHouseOwnershipAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );
  return (
    <ActionDialogContainer
      title="Tambah Status Rumah"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Status Rumah</Button>}
    >
      <HouseOwnershipForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditHouseOwnershipDialog = ({
  id,
  ownership,
  status,
}: {
  id: number;
  ownership: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        house_ownership_status: formData.get('house_ownership_status'),
        status: formData.get('status'),
      };
      return editHouseOwnershipAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );
  return (
    <ActionDialogContainer
      title="Edit Status Rumah"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <HouseOwnershipForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHouseOwnership={ownership}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const RemoveHouseOwnershipDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeHouseOwnershipAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Status Rumah?"
      isPending={isPending}
      deleteAction={() => execute({ id })}
      open={open}
      setOpen={setOpen}
      trigger={
        <Button size="icon" variant="outline">
          <Trash />
        </Button>
      }
    />
  );
};
