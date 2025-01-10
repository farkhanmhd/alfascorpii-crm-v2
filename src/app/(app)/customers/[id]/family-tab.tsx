'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { addFamilyCardAction } from '@/app/lib/actions/customers';
import TextInput from '@/components/fragments/form/TextInput';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/fragments/table/DataTable';
import { IFamilyCard } from '@/types';
import { toast } from '@/hooks/use-toast';
import { getErrorMessages } from '@/lib/utils';
import columns from './family-column';

type Props = {
  families: IFamilyCard;
};

const FamilyTab = ({ families }: Props) => {
  const [familyNumber, setFamilyNumber] = useState<string>('');
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

  return (
    <div className="mb-8 space-y-8">
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
      {Object.keys(families).length > 0 && (
        <>
          <div className="w-full max-w-full space-y-4">
            <h2 className="font-bold text-primary">ANGGOTA KELUARGA</h2>
            <div>
              <DataTable
                data={families.family_list || []}
                columns={columns}
                extensible
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-primary">
              ANGGOTA KELUARGA TIDAK DALAM SATU KARTU KELUARGA
            </h2>
            <div>
              <DataTable
                data={families.related_person || []}
                columns={columns}
                extensible
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FamilyTab;
