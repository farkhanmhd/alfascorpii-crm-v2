'use client';

import React from 'react';
import { IFamilyCard, IFamilyMember } from '@/types';
import FamilyData from './FamilyData';

type Props = {
  families?: IFamilyCard | null;
  relatedPersons?: IFamilyMember[];
};

const FamilyTab = ({ families, relatedPersons }: Props) => {
  return (
    <div className="mb-8 space-y-8">
      <div className="space-y-3">
        <h2 className="font-semibold">NO. KARTU KELUARGA</h2>
        <p>{families?.family_card_number || '-'}</p>
      </div>
      {families && (
        <FamilyData
          editable={false}
          setEditable={() => {}}
          families={families}
          relatedPersons={relatedPersons}
        />
      )}
    </div>
  );
};

export default FamilyTab;
