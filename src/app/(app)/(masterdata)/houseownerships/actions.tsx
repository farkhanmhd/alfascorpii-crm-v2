'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { IHouseOwnership } from '@/types';
import {
  addHouseOwnershipAction,
  editHouseOwnershipAction,
  removeHouseOwnershipAction,
} from '@/app/lib/actions/houseownerships';
import HouseOwnershipForm from './HouseOwnershipForm';

export const CreateHouseOwnershipDialog = () => {
  const { handleClose } = useActionDialog<IHouseOwnership>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      house_ownership_status: formData.get('house_ownership_status'),
      status: formData.get('status'),
    };
    return addHouseOwnershipAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Status Rumah">
      <HouseOwnershipForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditHouseOwnershipDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IHouseOwnership>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      house_ownership_status: formData.get('house_ownership_status'),
      status: formData.get('status'),
    };
    return editHouseOwnershipAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Status Rumah">
      <HouseOwnershipForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHouseOwnership={actionDialog?.data?.house_ownership_status}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const RemoveHouseOwnershipDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, isPending, result, reset } = useAction(
    removeHouseOwnershipAction
  );

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Status Rumah?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
