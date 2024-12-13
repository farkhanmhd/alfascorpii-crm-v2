'use client';

import React from 'react';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';

export const AssignToCRO = () => {
  return (
    <ActionDialogContainer title="Choose CRO">
      <form className="flex flex-col gap-y-8">
        <SubmitButton className="self-end">Submit</SubmitButton>
      </form>
    </ActionDialogContainer>
  );
};
