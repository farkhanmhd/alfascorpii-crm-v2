'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateJob, removeJob } from '@/app/lib/actions/customers/pekerjaan';
import DialogContainer from '@/components/fragments/dialogs/DialogContainer';
import CustomerJobForm from '../../CustomerJobForm';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import { useRemoveParam, useSubmitToast, useDeleteToast } from '@/hooks';

interface CustomerJobActionProps {
  job: string;
  code: string;
  status: 'SHOW' | 'HIDE';
  id: number;
}

const CustomerJobAction = ({
  job,
  code,
  status,
  id,
}: CustomerJobActionProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { back } = useRouter();
  const searchParams = useSearchParams();

  const { execute, result, reset, isPending } = useAction(async (formData) => {
    const data = {
      id,
      job: formData.get('job'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return updateJob(data);
  });

  const {
    execute: deleteJob,
    isPending: isDeletePending,
    result: deleteResult,
    reset: revert,
  } = useAction(removeJob);

  useRemoveParam(searchParams, setDeleteModal);
  useSubmitToast(result, back, reset);
  useDeleteToast(deleteResult, back, revert);

  return (
    <DialogContainer
      title={deleteModal ? 'Hapus Pekerjaan?' : 'Edit Pekerjaan'}
    >
      {deleteModal ? (
        <DeleteDialog
          action={() => deleteJob({ id })}
          isPending={isDeletePending}
        />
      ) : (
        <CustomerJobForm
          initialJob={job}
          initialCode={code}
          initialStatus={status}
          action={execute}
          validationErrors={result?.validationErrors}
          isPending={isPending}
        />
      )}
    </DialogContainer>
  );
};

export default CustomerJobAction;
