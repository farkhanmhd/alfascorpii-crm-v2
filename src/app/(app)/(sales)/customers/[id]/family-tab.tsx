'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { addFamilyCardAction } from '@/app/lib/actions/customers';
import TextInput from '@/components/elements/form/TextInput';
import { Button } from '@/components/ui/button';
import { IFamilyCard, IFamilyMember } from '@/types';
import { toast } from '@/hooks/use-toast';
import { getErrorMessages, checkPermission } from '@/lib/utils';
import { usePermissions } from '@/hooks';
import FamilyData from './FamilyData';

type Props = {
  families?: IFamilyCard | null;
  relatedPersons?: IFamilyMember[];
};

const FamilyTab = ({ families, relatedPersons }: Props) => {
  const [familyNumber, setFamilyNumber] = useState<string>(
    families?.family_card_number || ''
  );

  const { permissions } = usePermissions();

  const [editable, setEditable] = useState<boolean>(false);
  const params = useParams();
  const { id } = params;
  const { execute, isPending, result } = useAction(
    async (formData) => {
      const data = {
        id: Number(id),
        family_card_number: formData.get('family-card-number'),
      };
      return addFamilyCardAction(data);
    },
    {
      onSuccess: ({ data }: { data?: { status: string; message: string } }) => {
        if (data?.status === 'success') {
          toast({
            title: 'Success',
            description: data?.message,
          });
        } else {
          toast({
            title: 'Error',
            description: data?.message,
            variant: 'destructive',
          });
        }
      },
    }
  );

  const canSaveFamilyCardNumber = checkPermission(
    'service_fu_save_family_card_number',
    permissions
  );
  // const canUpdateFamilyMember = checkPermission(
  //   'service_fu_update_family_member_button',
  //   permissions
  // );
  // const canSaveFamilyMember = checkPermission(
  //   'service_fu_save_updated_family_member_button',
  //   permissions
  // );

  return (
    <div className="mb-8 space-y-8">
      {canSaveFamilyCardNumber && (
        <div className="flex gap-x-4">
          <form action={execute} className="flex gap-x-4">
            <div className="w-[300px]">
              <TextInput
                id="family-card-number"
                name="family-card-number"
                label="NO. KARTU KELUARGA"
                placeholder="Masukkan Nomor Kartu Keluarga"
                inputMode="numeric"
                labelClass="font-bold"
                value={familyNumber}
                error={getErrorMessages(
                  result.validationErrors?.family_card_number
                )}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  setFamilyNumber(numericValue);
                }}
              />
            </div>
            <Button
              className="h-9 self-end"
              variant="blue"
              disabled={isPending}
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      )}
      {families && (
        <FamilyData
          editable={editable}
          setEditable={setEditable}
          families={families}
          relatedPersons={relatedPersons}
        />
      )}
    </div>
  );
};

export default FamilyTab;
