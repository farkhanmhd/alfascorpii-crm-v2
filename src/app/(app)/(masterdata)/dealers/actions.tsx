'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import { IDealer, DealerArea, DealerType } from '@/types';
import {
  addDealerAction,
  editDealerAction,
  removeDealerAction,
} from '@/app/lib/actions/dealers';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import DealerForm from './DealerForm';

export const CreateDealerDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IDealer>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      dealer_code: formData.get('dealer_code'),
      dealer_name: formData.get('dealer_name'),
      dealer_area: actionDialog?.data?.dealer_area as DealerArea,
      dealer_type: actionDialog?.data?.dealer_type as DealerType,
    };
    return addDealerAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Dealer">
      <DealerForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};
export const EditDealerDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IDealer>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      dealer_code: formData.get('dealer_code'),
      dealer_name: formData.get('dealer_name'),
      dealer_area: actionDialog?.data?.dealer_area as DealerArea,
      dealer_type: actionDialog?.data?.dealer_type as DealerType,
    };
    return editDealerAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Dealer">
      <DealerForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialCode={actionDialog?.data?.dealer_code}
        initialName={actionDialog?.data?.dealer_name}
        initialArea={actionDialog?.data?.dealer_area}
        initialType={actionDialog?.data?.dealer_type}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDealerDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeDealerAction);
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Dealer"
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
      isPending={isPending}
    />
  );
};
