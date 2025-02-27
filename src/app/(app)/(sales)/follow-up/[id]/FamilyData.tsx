'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { updateFamilyMembersAction } from '@/app/lib/actions/customers';
import { Button } from '@/components/ui/button';
import { IFamilyCard, FamilyMemberPayload, IFamilyMember } from '@/types';
import { toast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import FamilyListTable from './family-list-table';

interface Props {
  families?: IFamilyCard | null;
  relatedPersons?: IFamilyMember[];
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
  const [familyList, setFamilyList] = useState<FamilyMemberPayload[]>([]);
  const [relatedPersonsState, setRelatedPersons] = useState<
    FamilyMemberPayload[]
  >([]);
  const [originalFamilyList, setOriginalFamilyList] = useState<
    FamilyMemberPayload[]
  >([]);
  const [originalRelatedPersons, setOriginalRelatedPersons] = useState<
    FamilyMemberPayload[]
  >([]);

  // Deep copy function to prevent unintended mutations
  const deepCopy = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

  // Initialize the state with the original data
  useEffect(() => {
    const initialFamilyList = families?.family_list
      ? deepCopy(families.family_list)
      : [];
    const initialRelatedPersons = relatedPersons
      ? deepCopy(relatedPersons)
      : [];
    setFamilyList(initialFamilyList);
    setRelatedPersons(initialRelatedPersons);
    setOriginalFamilyList(initialFamilyList);
    setOriginalRelatedPersons(initialRelatedPersons);
  }, [families?.family_list, relatedPersons]);

  const resetToOriginalState = useCallback(() => {
    setFamilyList(deepCopy(originalFamilyList));
    setRelatedPersons(deepCopy(originalRelatedPersons));
  }, [originalFamilyList, originalRelatedPersons]);

  const { permissions } = usePermissions();

  const canUpdateFamilyMember = checkPermission(
    'service_fu_update_family_member_button',
    permissions
  );
  const canSaveFamilyMember = checkPermission(
    'service_fu_save_updated_family_member_button',
    permissions
  );

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
          // Update the original state after a successful save
          setOriginalFamilyList(deepCopy(familyList));
          setOriginalRelatedPersons(deepCopy(relatedPersonsState));
        } else {
          toast({
            title: 'Error',
            description: result?.message,
            variant: 'destructive',
          });
        }
        setEditable(false);
      },
      onError: ({ error }) => {
        if (error.validationErrors) {
          toast({
            title: 'Validation Error',
            description: 'Tidak boleh ada data yang kosong',
            variant: 'destructive',
          });
        }
      },
    }
  );

  const handleCancel = () => {
    resetToOriginalState();
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
      const updatedSourceTable = [...sourceTable];
      const [movedRow] = updatedSourceTable.splice(rowIndex, 1);
      setSourceTable(updatedSourceTable);
      setTargetTable([...targetTable, movedRow]);
    } else {
      console.warn('Invalid move direction for this table');
    }
  };

  return (
    <>
      <div className="w-full max-w-full space-y-4">
        <h2 className="font-bold text-primary">ANGGOTA KELUARGA</h2>
        <div>
          <FamilyListTable
            data={optimisticState?.data?.family_members || []}
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
            data={optimisticState?.data?.related_people || []}
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
          {canSaveFamilyMember && (
            <Button variant="blue" onClick={handleSave} disabled={isPending}>
              Save
            </Button>
          )}
        </div>
      ) : (
        canUpdateFamilyMember && (
          <Button variant="orange" onClick={() => setEditable(true)}>
            Update Data
          </Button>
        )
      )}
    </>
  );
};

export default FamilyData;
