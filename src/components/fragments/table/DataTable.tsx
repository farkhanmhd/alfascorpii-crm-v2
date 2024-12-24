'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import MapItems from '@/utils/MapItems';
import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
}

export const DataTable = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    rowCount: rows,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => String(row.id),
    autoResetPageIndex: false,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <ScrollArea className="rounded-md">
      <Table>
        <TableHeader className="sticky top-0 z-50 bg-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-primary">
              <MapItems
                of={headerGroup.headers}
                render={(header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-primary-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )}
              />
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-background">
          {table.getRowModel().rows?.length ? (
            <MapItems
              of={table.getRowModel().rows}
              render={(row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  <MapItems
                    of={row.getVisibleCells()}
                    render={(cell) => (
                      <TableCell
                        key={cell.id}
                        className="h-12 px-4 py-2 text-xs sm:text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )}
                  />
                </TableRow>
              )}
            />
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
