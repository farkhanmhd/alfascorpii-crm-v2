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
import MapItems from '@/utils/MapItems';
import { Column, DataTableProps } from '@/types';

const DataTable = <T,>({
  columns,
  data,
  includeIndex = false,
}: DataTableProps<T>) => {
  return (
    <Table className="md:none order-1">
      <TableHeader>
        <TableRow>
          {includeIndex && <TableHeaderCell>No</TableHeaderCell>}
          <MapItems
            of={columns}
            render={(col) => <TableHeaderCell>{col.header}</TableHeaderCell>}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          <MapItems
            of={data}
            render={(item: T, rowIndex: number) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50">
                {includeIndex && <TableCell>{rowIndex + 1}</TableCell>}
                <MapItems
                  of={columns}
                  render={(col: Column<T>) => (
                    <TableCell>{col.getCellContent(item)}</TableCell>
                  )}
                />
              </TableRow>
            )}
          />
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>No Data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
