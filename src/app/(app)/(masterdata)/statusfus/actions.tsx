'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, useMethodFu, usePermissions } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addStatusFuAction,
  updateStatusFuAction,
  deleteStatusFuAction,
} from '@/app/lib/actions/statusfus';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import { SelectOptions } from '@/types';
import StatusFuForm from './StatusFuForm';

export const CreateStatusFuDialog = ({
  methodOptions,
}: {
  methodOptions: SelectOptions[];
}) => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();
  const [methodId, setMethodId] = useState(methodOptions[0].value);
  const { setMethodFu } = useMethodFu();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        fu_method_id: formData.get('fu_method_id'),
        status_fu_name: formData.get('status_fu_name'),
        status: formData.get('status'),
      };
      return addStatusFuAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  useEffect(() => {
    setMethodFu(methodOptions);
  }, [methodOptions]);

  const canAdd =
    checkPermission('add_status_follow_up', permissions) &&
    checkPermission('view_status_follow_up', permissions);

  if (!canAdd) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Status Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Status Follow Up</Button>}
    >
      <StatusFuForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        methodOptions={methodOptions}
        methodId={methodId}
        setMethodId={setMethodId}
      />
    </ActionDialogContainer>
  );
};

export const EditStatusFuDialog = ({
  id,
  method,
  name,
  status,
}: {
  id: number;
  method: string;
  name: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const [methodId, setMethodId] = useState(method);
  const { methodFu } = useMethodFu();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        fu_method_id: formData.get('fu_method_id'),
        status_fu_name: formData.get('status_fu_name'),
        status: formData.get('status'),
      };
      return updateStatusFuAction(data);
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
      title="Edit Status Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <StatusFuForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialDetail={name}
        initialStatus={status}
        methodOptions={methodFu}
        methodId={methodId}
        setMethodId={setMethodId}
      />
    </ActionDialogContainer>
  );
};

export const DeleteStatusFuDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(deleteStatusFuAction, {
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
