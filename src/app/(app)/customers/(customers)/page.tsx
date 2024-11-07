import React from 'react';
import { Metadata } from 'next';
import SelectedFilters from './selected-filters';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CustomerFilter from './filters';
import { getCustomers } from '@/app/lib/data/customers';
import DataTable from '@/components/fragments/table/DataTable';
import DataTablePagination from '@/components/fragments/table/pagination';
import Tablesearch from '@/components/fragments/table/tablesearch';
import columns from './columns';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async () => {
  const customers = await getCustomers();
  return (
    <div className="grid h-full grid-rows-[auto_auto_auto_1fr_auto] gap-y-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="filter" className="border-none">
          <AccordionTrigger className="text-blue-500">Filter</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CustomerFilter />
              </CardHeader>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <SelectedFilters />
      <Tablesearch placeholder="Search Customer" />
      <div className="overflow-hidden rounded-lg border">
        <DataTable columns={columns} data={customers} includeIndex />
      </div>
      <DataTablePagination currentPage={1} totalPages={5} />
    </div>
  );
};

export default Page;
