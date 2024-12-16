'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DataTablePagination from '@/components/fragments/table/pagination';
import MapItems from '@/utils/MapItems';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  currentPage: number;
  totalPages: number;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export const DataTable = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  currentPage,
  rows,
  totalPages,
  rowSelection,
  setRowSelection,
}: DataTableProps<TData, TValue>) => {
  // Create the table instance with conditional rowSelection
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: rows,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => String(row.id),
    autoResetPageIndex: false,
    state: {
      rowSelection,
    },
  });

  return (
    <>
      <div className="hide-scrollbar overflow-auto">
        <Table>
          <TableHeader
            className="sticky top-0 bg-background"
            style={{
              boxShadow: '0px .5px 0px hsl(var(--border)),',
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <MapItems
                  of={headerGroup.headers}
                  render={(header) => (
                    <TableHead key={header.id} className="p-3">
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
                    data-state={
                      rowSelection && row.getIsSelected() && 'selected'
                    } // Conditional styling for row selection
                  >
                    <MapItems
                      of={row.getVisibleCells()}
                      render={(cell) => (
                        <TableCell
                          key={cell.id}
                          className="p-3 text-xs sm:text-sm"
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};
