'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { ActivityLog } from '@/types';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { columns } from './log-update-columns';

const LogUpdate = ({ logs }: { logs: ActivityLog[] }) => {
  const { state } = useSidebar();
  return (
    <div className="px-6 pb-6">
      <Accordion type="multiple">
        <AccordionItem value="update">
          <AccordionTrigger>LOG UPDATE</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-y-8">
              <div
                className={cn(
                  'max-h-[800px] max-w-[calc(100svw-96px)] rounded-md bg-white shadow-sm',
                  {
                    'md:max-w-[calc(100svw-354px)]': state === 'expanded',
                    'md:max-w-[calc(100svw-144px)]': state === 'collapsed',
                  }
                )}
              >
                <DataTable columns={columns} data={logs} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LogUpdate;
