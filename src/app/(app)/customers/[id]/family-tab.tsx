import React from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns, { FamilyMember } from './family-column';

const familyMembers: FamilyMember[] = [
  {
    id: '1',
    nik: '1234567890',
    name: 'John Doe',
    gender: 'Male',
    birthplace: 'Jakarta',
    date_of_birth: '1990-01-01',
    religion: 'Islam',
    job: 'Software Engineer',
    education: "Bachelor's Degree",
    marital_status: 'Single',
    relationship: 'Son',
  },
  {
    id: '2',
    nik: '0987654321',
    name: 'Jane Smith',
    gender: 'Female',
    birthplace: 'Bandung',
    date_of_birth: '1992-05-15',
    religion: 'Christianity',
    job: 'Teacher',
    education: "Master's Degree",
    marital_status: 'Married',
    relationship: 'Daughter',
  },
  {
    id: '3',
    nik: '5678901234',
    name: 'Alice Johnson',
    gender: 'Female',
    birthplace: 'Surabaya',
    date_of_birth: '1985-12-10',
    religion: 'Hinduism',
    job: 'Architect',
    education: 'PhD',
    marital_status: 'Widowed',
    relationship: 'Mother',
  },
];

const nonHouseholdFamilyMembers: FamilyMember[] = [
  {
    id: '4',
    nik: '4567890123',
    name: 'Robert Brown',
    gender: 'Male',
    birthplace: 'Medan',
    date_of_birth: '1978-03-22',
    religion: 'Buddhism',
    job: 'Doctor',
    education: "Master's Degree",
    marital_status: 'Married',
    relationship: 'Uncle',
  },
  {
    id: '5',
    nik: '6789012345',
    name: 'Emily Davis',
    gender: 'Female',
    birthplace: 'Yogyakarta',
    date_of_birth: '1988-07-30',
    religion: 'Catholicism',
    job: 'Accountant',
    education: "Bachelor's Degree",
    marital_status: 'Single',
    relationship: 'Aunt',
  },
];

const FamilyTab = () => {
  return (
    <div className="space-y-8 px-4">
      <div className="flex gap-x-4">
        <div className="mt-4 w-[300px]">
          <TextInput
            id="family-card-number"
            label="NO. KARTU KELUARGA"
            placeholder="Masukkan Nomor Kartu Keluarga"
            inputMode="numeric"
            labelClass="font-bold"
          />
        </div>
        <Button className="h-9 self-end" variant="blue">
          Save
        </Button>
      </div>
      <div className="w-full max-w-full space-y-4">
        <h2 className="font-bold text-primary">ANGGOTA KELUARGA</h2>
        <div>
          <DataTable data={familyMembers} columns={columns} extensible />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-primary">
          ANGGOTA KELUARGA TIDAK DALAM SATU KARTU KELUARGA
        </h2>
        <div>
          <DataTable
            data={nonHouseholdFamilyMembers}
            columns={columns}
            extensible
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyTab;
