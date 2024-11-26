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
  currentPage,
  perPage,
}: DataTableProps<T>) => {
  const startIndex = (currentPage - 1) * perPage + 1;
  console.log(JSON.stringify(data));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {includeIndex && <TableHeaderCell>No</TableHeaderCell>}
          <MapItems
            of={columns}
            render={(col, index) => (
              <TableHeaderCell key={index}>{col.header}</TableHeaderCell>
            )}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          <MapItems
            of={data}
            render={(item: T, rowIndex: number) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50">
                {includeIndex && <TableCell>{startIndex + rowIndex}</TableCell>}
                <MapItems
                  of={columns}
                  render={(col: Column<T>, index) => (
                    <TableCell key={index}>
                      {col.GetCellContent(item)}
                    </TableCell>
                  )}
                />
              </TableRow>
            )}
          />
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
