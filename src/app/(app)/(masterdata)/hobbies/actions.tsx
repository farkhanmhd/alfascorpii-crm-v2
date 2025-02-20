'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useDialog, usePermissions } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addHobbyAction,
  updateHobbyAction,
  deleteHobbyAction,
} from '@/app/lib/actions/hobbies';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import HobbyForm from './HobbyForm';

export const CreateHobbyDialog = () => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        hobby_name: formData.get('hobby_name'),
        status: formData.get('status'),
      };
      return addHobbyAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAddHobby =
    checkPermission('add_hobbies', permissions) &&
    checkPermission('view_hobbies', permissions);

  if (!canAddHobby) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Hobi"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Hobi</Button>}
    >
      <HobbyForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditHobbyDialog = ({
  id,
  name,
  status,
}: {
  id: number;
  name: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        hobby_name: formData.get('hobby_name'),
        status: formData.get('status'),
      };
      return updateHobbyAction(data);
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
      title="Edit Hobi"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <HobbyForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHobby={name}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteHobbyDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(deleteHobbyAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Hobi?"
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      deleteAction={() => execute({ id })}
      trigger={
        <Button size="icon" variant="outline">
          <Trash />
        </Button>
      }
    />
  );
};
