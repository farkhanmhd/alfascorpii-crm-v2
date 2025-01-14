'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { updateFamilyMembersAction } from '@/app/lib/actions/customers';
import { Button } from '@/components/ui/button';
import { IFamilyCard, FamilyMemberPayload, IFamilyMember } from '@/types';
import { toast } from '@/hooks/use-toast';
import FamilyListTable from './family-list-table';

interface Props {
  families: IFamilyCard;
  relatedPersons: IFamilyMember[];
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const FamilyData = ({
  editable,
  setEditable,
  families,
  relatedPersons,
}: Props) => {
  const params = useParams();
  const { id } = params;
  const [familyList, setFamilyList] = useState<FamilyMemberPayload[]>(
    families.family_list
  );
  const [relatedPersonsState, setRelatedPersons] =
    useState<FamilyMemberPayload[]>(relatedPersons);

  useEffect(() => {
    setFamilyList(families.family_list);
    setRelatedPersons(relatedPersons);
  }, [families, relatedPersons]);

  const { execute, isPending, optimisticState } = useOptimisticAction(
    updateFamilyMembersAction,
    {
      currentState: {
        data: {
          family_members: familyList,
          related_people: relatedPersonsState,
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
            })),
            related_people: input.related_people.map((person) => ({
              ...person,
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

  console.log(optimisticState.data);

  const handleCancel = () => {
    setFamilyList(families.family_list);
    setRelatedPersons(relatedPersons);
    setEditable(false);
  };

  const handleSave = () => {
    execute({
      id: String(id),
      family_members: familyList,
      related_people: relatedPersonsState,
    });
  };

  const handleMoveRow = (
    tableIndex: number,
    rowIndex: number,
    direction: 'top' | 'bottom'
  ) => {
    const sourceTable = tableIndex === 0 ? familyList : relatedPersonsState;
    const targetTable = tableIndex === 0 ? relatedPersonsState : familyList;
    const setSourceTable = tableIndex === 0 ? setFamilyList : setRelatedPersons;
    const setTargetTable = tableIndex === 0 ? setRelatedPersons : setFamilyList;

    if (
      (direction === 'bottom' && tableIndex === 0) ||
      (direction === 'top' && tableIndex === 1)
    ) {
      // Move to the other table
      const [movedRow] = sourceTable.splice(rowIndex, 1);
      setSourceTable([...sourceTable]);
      setTargetTable([...targetTable, movedRow]);
    } else {
      // This case should not happen, but we'll keep it for safety
      console.warn('Invalid move direction for this table');
    }
  };

  return (
    <>
      <div className="w-full max-w-full space-y-4">
        <h2 className="font-bold text-primary">ANGGOTA KE LUARGA</h2>
        <div>
          <FamilyListTable
            data={optimisticState?.data?.family_members}
            setData={setFamilyList}
            editable={editable}
            onMoveRow={(rowIndex) => handleMoveRow(0, rowIndex, 'bottom')}
            isTopTable
          />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-primary">
          ANGGOTA KELUARGA TIDAK DALAM SATU KARTU KELUARGA
        </h2>
        <div>
          <FamilyListTable
            data={optimisticState?.data?.related_people}
            setData={setRelatedPersons}
            editable={editable}
            onMoveRow={(rowIndex) => handleMoveRow(1, rowIndex, 'top')}
            isTopTable={false}
          />
        </div>
      </div>
      {editable ? (
        <div className="flex w-full justify-between">
          <Button onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="blue"
            onClick={() => {
              handleSave();
              setEditable(false);
            }}
            disabled={isPending}
          >
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
