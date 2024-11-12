import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SelectedFilters from './selected-filters';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import CustomerFilter from './filters';
import CustomerTable from './CustomerTable';
import Tablesearch from '@/components/fragments/table/tablesearch';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async () => {
  return (
    <div className="grid h-full grid-rows-[auto_auto_auto_1fr_auto] gap-y-4">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="secondary">
            <span>Select Filters</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card>
            <CardHeader>
              <CustomerFilter />
            </CardHeader>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      <SelectedFilters />
      <Tablesearch placeholder="Search Customer" />
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default Page;
