import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { ActivityLog } from '@/types';
import { columns } from './log-update-columns';

const LogUpdate = ({ logs }: { logs: ActivityLog[] }) => {
  return (
    <div className="px-6 pb-6">
      <h2 className="font-semibold">LOG UPDATE</h2>
      <div className="flex flex-col gap-y-8">
        <div className="mt-4 rounded-md border">
          <DataTable columns={columns} data={logs} />
        </div>
      </div>
    </div>
  );
};

export default LogUpdate;
