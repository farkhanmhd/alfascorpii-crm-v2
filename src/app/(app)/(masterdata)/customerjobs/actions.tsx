'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, usePermissions } from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { addJob, updateJob, removeJob } from '@/app/lib/actions/customerjobs';
import { actionResponseToast, checkPermission } from '@/lib/utils';

import CustomerJobForm from './CustomerJobForm';

export const CreateCustomerJobDialog = () => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();

  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        job: formData.get('job'),
        code: formData.get('code'),
        status: formData.get('status'),
      };
      return addJob(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAddJob =
    checkPermission('add_jobs', permissions) &&
    checkPermission('view_master_data', permissions);

  if (!canAddJob) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Pekerjaan"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pekerjaan</Button>}
    >
      <CustomerJobForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditCustomerJobDialog = ({
  id,
  job,
  code,
  status,
}: {
  id: number;
  job: string;
  code: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();

  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        job: formData.get('job'),
        code: formData.get('code'),
        status: formData.get('status'),
      };
      return updateJob(data);
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
      title="Edit Pekerjaan"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <CustomerJobForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialJob={job}
        initialCode={code}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteJobDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute: deleteJob, isPending } = useAction(removeJob, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Pekerjaan?"
      isPending={isPending}
      deleteAction={() => deleteJob({ id })}
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
