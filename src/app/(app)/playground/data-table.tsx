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
// import { atom, useAtom } from 'jotai';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Tablesearch from '@/components/fragments/table/tablesearch';
import DataTablePagination from '@/components/fragments/table/pagination';
import MapItems from '@/utils/MapItems';
import DataTableViewOptions from './data-table-view-options';

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  currentPage: number;
  totalPages: number;
}

// in case if we need to get selected rows on different component
// const selectedAtom = atom<Record<string, boolean>>({});

export const DataTable = <TData extends { id: string }, TValue>({
  columns,
  data,
  currentPage,
  rows,
  totalPages,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
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
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    state: {
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-auto">
      <div className="flex items-center py-4">
        <Tablesearch placeholder="Search Customer" />
        <DataTableViewOptions table={table} />
      </div>
      <div className="hide-scrollbar overflow-auto">
        <Table>
          <TableHeader
            className="bg-background/8 sticky top-0 z-50 backdrop-blur-lg"
            style={{
              boxShadow: '0px .5px 0px hsl(var(--border)),',
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <MapItems
                  of={headerGroup.headers}
                  render={(header) => (
                    <TableHead key={header.id}>
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
                        <TableCell key={cell.id} className="px-4 py-2">
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
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedRows={Object.keys(rowSelection).length}
        totalRows={table.getRowCount()}
      />
    </div>
  );
};
