'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import { IRelation } from '@/types';
import {
  addRelationAction,
  editRelationAction,
  removeRelationAction,
} from '@/app/lib/actions/relation';
import RelationForm from './RelationForm';

export const CreateRelationDialog = () => {
  const { handleClose } = useActionDialog<IRelation>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      relation: formData.get('relation'),
      status: formData.get('status'),
    };
    return addRelationAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Kerabat">
      <RelationForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditRelationDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IRelation>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      relation: formData.get('relation'),
      status: formData.get('status'),
    };
    return editRelationAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Kerabat">
      <RelationForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialRelation={actionDialog?.data?.relation_name}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteRelationDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, isPending, result, reset } = useAction(removeRelationAction);

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Kerabat?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
