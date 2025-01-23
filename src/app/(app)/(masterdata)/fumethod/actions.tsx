'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addFuMethodAction,
  editFuMethodAction,
  removeFuMethodAction,
} from '@/app/lib/actions/fumethod';
import { actionResponseToast } from '@/lib/utils';
import FuMethodForm from './FuMethodForm';

export const CreateFuMethodDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        fu_method_name: formData.get('fu_method_name'),
        status: formData.get('status'),
      };
      return addFuMethodAction(data);
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
      title="Tambah Metode Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Metode Follow Up</Button>}
    >
      <FuMethodForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditFuMethodDialog = ({
  id,
  method,
  status,
}: {
  id: number;
  method: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        fu_method_name: formData.get('fu_method_name'),
        status: formData.get('status'),
      };
      return editFuMethodAction(data);
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
      title="Edit Metode Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <FuMethodForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialMethod={method}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteFuMethodDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeFuMethodAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Pekerjaan?"
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
