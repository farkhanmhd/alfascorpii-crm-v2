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

export interface Column<T> {
  header: string;
  key: keyof T;
  getCellContent?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  includeIndex?: boolean;
}

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
          {columns.map((col) => (
            <TableHeaderCell key={col.header}>{col.header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {includeIndex && <TableCell>{rowIndex + 1}</TableCell>}
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {(col.getCellContent && col.getCellContent(item)) ||
                    (item[col.key] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
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
