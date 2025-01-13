'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { updateFamilyMembersAction } from '@/app/lib/actions/customers';
import { Button } from '@/components/ui/button';
import { IFamilyCard, FamilyMemberPayload } from '@/types';
import { toast } from '@/hooks/use-toast';
import FamilyListTable from './family-list-table';

interface Props {
  families: IFamilyCard;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const FamilyData = ({ editable, setEditable, families }: Props) => {
  const params = useParams();
  const { id } = params;
  const [familyList, setFamilyList] = useState<FamilyMemberPayload[]>(
    families.family_list
  );
  const [relatedFamily, setRelatedFamily] = useState<FamilyMemberPayload[]>(
    families.related_person
  );

  const { execute, isPending, optimisticState } = useOptimisticAction(
    async () => {
      const submittedData = {
        id: id as string,
        family_members: familyList,
        related_people: relatedFamily,
      };
      return updateFamilyMembersAction(
        submittedData as {
          id: string;
          family_members: FamilyMemberPayload[];
          related_people: FamilyMemberPayload[];
        }
      );
    },
    {
      currentState: {
        data: {
          family_members: familyList,
          related_people: relatedFamily,
        },
      },
      updateFn: (
        state: {
          data: {
            family_members: FamilyMemberPayload[];
            related_people: FamilyMemberPayload[];
          };
        },
        input
      ) => {
        return {
          ...state,
          data: {
            ...state.data,
            family_members: input.family_members.map((member) => ({
              ...member,
              id: '',
              is_customer: false,
            })),
            related_people: input.related_people.map((person) => ({
              ...person,
              id: '',
              is_customer: false,
            })),
          },
        };
      },

      onSuccess: ({ data: result }) => {
        if (result?.status === 'success') {
          toast({
            title: 'Success',
            description: result?.message,
          });
        } else {
          toast({
            title: 'Error',
            description: result?.message,
            variant: 'destructive',
          });
        }
        setEditable(false);
      },
    }
  );

  const handleCancel = () => {
    setFamilyList(families.family_list);
    setRelatedFamily(families.related_person);
    setEditable(false);
  };

  const handleSave = () => {
    execute({
      id: String(id),
      family_members: familyList,
      related_people: relatedFamily,
    });
  };

  return (
    <>
      <div className="w-full max-w-full space-y-4">
        <h2 className="font-bold text-primary">ANGGOTA KELUARGA</h2>
        <div>
          <FamilyListTable
            data={optimisticState?.data?.family_members || familyList}
            setData={setFamilyList}
            editable={editable}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-primary">
          ANGGOTA KELUARGA TIDAK DALAM SATU KARTU KELUARGA
        </h2>
        <div>
          <FamilyListTable
            data={optimisticState?.data?.related_people || relatedFamily}
            setData={setRelatedFamily}
            editable={editable}
          />
        </div>
      </div>
      {editable ? (
        <div className="flex w-full justify-between">
          <Button onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="blue" onClick={handleSave} disabled={isPending}>
            Save
          </Button>
        </div>
      ) : (
        <Button variant="orange" onClick={() => setEditable(true)}>
          Update Data
        </Button>
      )}
    </>
  );
};

export default FamilyData;
