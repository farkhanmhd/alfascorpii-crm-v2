import React from 'react';
import { CustomerDeals } from '@/types';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { DataTable } from '@/components/elements/table/DataTable';
import { unitColumns, serviceColumns, sparepartColumns } from './deals-columns';

export const CustomerDealsAccordion: React.FC<{ deals: CustomerDeals }> = ({
  deals,
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold">Deal Customer</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="unit">
          <AccordionTrigger>Unit</AccordionTrigger>
          <AccordionContent>
            <DataTable columns={unitColumns} data={deals.unit} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="service">
          <AccordionTrigger>Service</AccordionTrigger>
          <AccordionContent>
            <DataTable columns={serviceColumns} data={deals.service} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sparepart">
          <AccordionTrigger>Sparepart</AccordionTrigger>
          <AccordionContent>
            <DataTable columns={sparepartColumns} data={deals.sparepart} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
