'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, usePermissions } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import {
  addServiceTypeAction,
  editServiceTypeAction,
  removeServiceTypeAction,
} from '@/app/lib/actions/servicetypes';
import ServiceTypeForm from './ServiceTypeForm';

export const CreateServiceTypeDialog = () => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        service_name: formData.get('service_name'),
        status: formData.get('status'),
      };
      return addServiceTypeAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAdd =
    checkPermission('add_service_types', permissions) &&
    checkPermission('view_service_types', permissions);

  if (!canAdd) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Tipe Service"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Tipe Service</Button>}
    >
      <ServiceTypeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditServiceTypeDialog = ({
  id,
  name,
}: {
  id: number;
  name: string;
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        service_name: formData.get('service_name'),
      };
      return editServiceTypeAction(data);
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
      title="Edit Tipe Service"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <ServiceTypeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialServiceType={name}
      />
    </ActionDialogContainer>
  );
};

export const DeleteServiceTypeDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeServiceTypeAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Tipe Service?"
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
