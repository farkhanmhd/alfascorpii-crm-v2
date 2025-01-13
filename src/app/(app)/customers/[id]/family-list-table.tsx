'use client';

import React from 'react';
import {
  DataTable,
  ColumnConfig,
} from '@/components/fragments/table/DataTable';
import { Input } from '@/components/ui/input';
import DatePicker from '@/components/fragments/form/DatePicker';
import { FamilyMemberPayload } from '@/types';
import { SelectBox } from '@/components/fragments/form/Select';
import { format } from 'date-fns';
import columns from './family-column';

interface Props {
  data: FamilyMemberPayload[];
  setData: React.Dispatch<React.SetStateAction<FamilyMemberPayload[]>>;
  editable: boolean;
}

const FamilyListTable = ({ data, setData, editable }: Props) => {
  const columnConfig: Record<string, ColumnConfig> = columns.reduce(
    (acc, column) => {
      acc[column.id as string] = {
        inputType: 'text',
        validate: (value: string) => value.length > 0,
      };
      return acc;
    },
    {} as Record<string, ColumnConfig>
  );

  columnConfig.born_date.inputType = 'date';
  columnConfig.gender.inputType = 'select';
  columnConfig.religion.inputType = 'select';
  columnConfig.marital_status.inputType = 'select';

  const renderInput = (
    columnId: string,
    value: string,
    onChange: (value: string) => void,
    config: ColumnConfig
  ) => {
    if (config.inputType === 'date') {
      return (
        <DatePicker
          date={new Date(value || new Date())}
          setDate={(date: Date) => onChange(format(date, 'yyyy-MM-dd'))}
          className="h-9"
        />
      );
    }

    if (columnId === 'gender') {
      return (
        <SelectBox
          options={[
            { label: 'Pria', value: 'Pria' },
            { label: 'Wanita', value: 'Wanita' },
          ]}
          placeholder="Jenis Kelamin"
          value={value}
          setValue={onChange}
          className="h-9"
        />
      );
    }

    if (columnId === 'religion') {
      return (
        <SelectBox
          options={[
            { label: 'Islam', value: 'Islam' },
            { label: 'Kristen', value: 'Kristen' },
            { label: 'Katolik', value: 'Katolik' },
            { label: 'Buddha', value: 'Buddha' },
            { label: 'Hindu', value: 'Hindu' },
            { label: 'Konghucu', value: 'Konghucu' },
          ]}
          placeholder="Agama"
          value={value}
          setValue={onChange}
          className="h-9"
        />
      );
    }

    if (columnId === 'marital_status') {
      return (
        <SelectBox
          options={[
            { label: 'Menikah', value: 'Menikah' },
            { label: 'Belum Menikah', value: 'Belum Menikah' },
          ]}
          placeholder="Status"
          value={value}
          setValue={onChange}
          className="h-9"
        />
      );
    }

    return <Input value={value} onChange={(e) => onChange(e.target.value)} />;
  };

  return (
    <DataTable
      data={data}
      setData={setData}
      columns={columns}
      editable={editable}
      columnConfig={columnConfig}
      renderInput={renderInput}
    />
  );
};

export default FamilyListTable;
