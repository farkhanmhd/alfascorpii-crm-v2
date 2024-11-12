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

const TableSkeleton = ({
  includeIndex = false,
  columnCount = 5,
  rowCount = 10,
}) => {
  const columns = Array.from({ length: columnCount });
  const rows = Array.from({ length: rowCount });

  return (
    <Table>
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
          render={(_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {includeIndex && (
                <TableCell>
                  <Skeleton className="h-[20px] w-full rounded-full" />
                </TableCell>
              )}
              <MapItems
                of={columns}
                render={(_, colIndex) => (
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
