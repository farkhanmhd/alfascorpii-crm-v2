'use cleint';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import { IMotorcycleList } from '@/types';
import {
  addMotorcycleAction,
  updateMotorcycleAction,
  deleteMotorcycleAction,
} from '@/app/lib/actions/motorcycles';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ProductPreferencesForm from './ProductPreferencesForm';

export const CreateProductDialog = () => {
  const { handleClose } = useActionDialog<IMotorcycleList>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      product_name: formData.get('product_name'),
    };

    return addMotorcycleAction(data);
  });

  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Sepeda Motor">
      <ProductPreferencesForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditProductDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IMotorcycleList>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      product_name: formData.get('product_name'),
    };
    return updateMotorcycleAction(data);
  });

  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Sepeda Motor">
      <ProductPreferencesForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialProduct={actionDialog?.data?.motorcycle_type}
      />
    </ActionDialogContainer>
  );
};

export const DeleteProductDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(
    deleteMotorcycleAction
  );
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Sepeda Motor?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
