'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/fragments/table/table';
import { Skeleton } from '@/components/ui/skeleton';
import MapItems from '@/utils/MapItems';

const TableSkeleton = () => {
  const columns = Array.from({ length: 5 });
  const rows = Array.from({ length: 10 });

  return (
    <Table className="overflow-hidden rounded-md bg-white">
      <TableHeader>
        <TableRow>
          <MapItems
            of={columns}
            render={(_, index) => (
              <TableHeaderCell key={index}>
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableHeaderCell>
            )}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        <MapItems
          of={rows}
          render={(items, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              <MapItems
                of={columns}
                render={(item, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-[20px] w-full rounded-full" />
                  </TableCell>
                )}
              />
            </TableRow>
          )}
        />
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
