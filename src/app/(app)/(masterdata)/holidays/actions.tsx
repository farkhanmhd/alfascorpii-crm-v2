'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
  useSelectedDate,
} from '@/hooks';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import { IHolidays } from '@/types';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import {
  addHolidayAction,
  editHolidayAction,
  removeHolidayAction,
} from '@/app/lib/actions/holiday';
import HolidayForm from './HolidayForm';

export const CreateHolidayDialog = () => {
  const { handleClose } = useActionDialog<IHolidays>();
  const { selectedDate } = useSelectedDate();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      holiday: formData.get('holiday'),
      message: formData.get('message'),
      date: selectedDate
        ? new Date(selectedDate).toISOString().slice(0, 10)
        : '',
      status: formData.get('status'),
    };

    return addHolidayAction(data);
  });

  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Hari besar">
      <HolidayForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditHolidayDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IHolidays>();
  const { selectedDate } = useSelectedDate();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      holiday: formData.get('holiday'),
      message: formData.get('message'),
      date: selectedDate
        ? new Date(selectedDate).toLocaleDateString('en-CA')
        : '',
      status: formData.get('status'),
    };

    return editHolidayAction(data);
  });

  useSubmitToast(result, handleClose, reset);

  return (
    <ActionDialogContainer title="Edit Hari besar">
      <HolidayForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHoliday={actionDialog?.data?.holiday_name}
        initialMessage={actionDialog?.data?.message}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteHolidayDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const {
    execute: deleteHoliday,
    isPending,
    result,
    reset,
  } = useAction(removeHolidayAction);

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Hari besar?"
      isPending={isPending}
      deleteAction={() => deleteHoliday({ id: Number(deleteDialog?.id) })}
    />
  );
};
