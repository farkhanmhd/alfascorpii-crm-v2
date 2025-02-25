'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, usePermissions } from '@/hooks';
import {
  addLeasingAction,
  updateLeasingAction,
  removeLeasingAction,
} from '@/app/lib/actions/leasing';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import LeasingForm from './LeasingForm';

export const CreateLeasingDialog = () => {
  const { permissions } = usePermissions();
  const canAddLeasing =
    checkPermission('add_leasing', permissions) &&
    checkPermission('view_leasings', permissions);

  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        leasing: formData.get('leasing'),
      };

      return addLeasingAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  if (!canAddLeasing) return null;

  return (
    <ActionDialogContainer
      title="Tambah Leasing"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Leasing</Button>}
    >
      <LeasingForm
        action={execute}
        isPending={isPending}
        validationErrors={result?.validationErrors}
      />
    </ActionDialogContainer>
  );
};

export const EditLeasingDialog = ({
  id,
  leasing,
}: {
  id: number;
  leasing: string;
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        leasing: formData.get('leasing'),
      };

      return updateLeasingAction(data);
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
      title="Edit Leasing"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <LeasingForm
        action={execute}
        initialLeasing={leasing}
        isPending={isPending}
        validationErrors={result?.validationErrors}
      />
    </ActionDialogContainer>
  );
};

export const DeleteLeasingDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute: deleteLeasing, isPending } = useAction(removeLeasingAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Leasing?"
      isPending={isPending}
      deleteAction={() => deleteLeasing({ id })}
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
