'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import ComboBox from '@/components/elements/form/ComboBox';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';
import { ComboBoxOptions, IDealer } from '@/types';
import { useActionDialog } from '@/hooks';

interface DealerFormProps {
  initialCode?: string;
  initialName?: string;
  initialArea?: string;
  initialType?: string;
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    dealer_code?: { _errors?: string[] };
    dealer_name?: { _errors?: string[] };
    dealer_area?: { _errors?: string[] };
    dealer_type?: { _errors?: string[] };
  };
  isPending: boolean;
}

const dealerAreaOptions: ComboBoxOptions[] = [
  {
    label: 'Aceh',
    value: 'Aceh',
  },
  {
    label: 'Medan',
    value: 'Medan',
  },
  {
    label: 'Sumatera Utara',
    value: 'Sumatera Utara',
  },
  {
    label: 'Riau',
    value: 'Riau',
  },
  {
    label: 'Kepulauan Riau',
    value: 'Kepulauan Riau',
  },
];

const dealerTypeOptions: ComboBoxOptions[] = [
  {
    label: 'Independen',
    value: 'Independen',
  },
  {
    label: 'MDS',
    value: 'MDS',
  },
  {
    label: 'Non Independent',
    value: 'Non Independent',
  },
];

const DealerForm: React.FC<DealerFormProps> = ({
  initialCode = '',
  initialName = '',
  initialArea = '',
  initialType = '',
  action,
  validationErrors,
  isPending,
}) => {
  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState(initialName);
  const { actionDialog, setActionDialog } = useActionDialog<IDealer>();
  const handleDealerAreaChange = (value: string) => {
    setActionDialog({
      ...actionDialog,
      data: { ...actionDialog?.data, dealer_area: value },
    });
  };

  const handleDealerTypeChange = (value: string) => {
    setActionDialog({
      ...actionDialog,
      data: { ...actionDialog?.data, dealer_type: value },
    });
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="dealer_code"
        label="Kode Dealer"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        name="dealer_code"
        error={getErrorMessages(validationErrors?.dealer_code)}
      />
      <TextInput
        id="dealer_name"
        label="Nama Dealer"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="dealer_name"
        error={getErrorMessages(validationErrors?.dealer_name)}
      />
      <ComboBox
        id="dealer_area"
        label="Area Dealer"
        value={actionDialog?.data?.dealer_area || initialArea}
        onSelect={handleDealerAreaChange}
        placeholder="Pilih Area Dealer"
        options={dealerAreaOptions}
        error={getErrorMessages(validationErrors?.dealer_area)}
        inputValue=""
        onValueChange={undefined}
        isPendingResult={false}
      />
      <ComboBox
        id="dealer_type"
        label="Jenis Dealer"
        value={actionDialog?.data?.dealer_type || initialType}
        onSelect={handleDealerTypeChange}
        placeholder="Pilih Jenis Dealer"
        options={dealerTypeOptions}
        error={getErrorMessages(validationErrors?.dealer_type)}
        inputValue=""
        onValueChange={handleDealerTypeChange}
        isPendingResult={false}
      />
      <SubmitButton disabled={isPending}>Submit</SubmitButton>
    </form>
  );
};

export default DealerForm;
