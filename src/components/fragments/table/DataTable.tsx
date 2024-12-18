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
    <div className="hide-scrollbar overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-50 overflow-hidden bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <MapItems
                of={headerGroup.headers}
                render={(header) => (
                  <TableHead
                    key={header.id}
                    className="rounded-md p-2 text-primary"
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
        <TableBody className="overflow-hidden">
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
                        className="h-12 p-2 text-xs sm:text-sm"
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
    </div>
  );
};
