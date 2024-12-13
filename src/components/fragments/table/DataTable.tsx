'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  // VisibilityState,
} from '@tanstack/react-table';

import { atom, useAtom } from 'jotai';

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
import Tablesearch from './tablesearch';
import AddButton from '../buttons/AddButton';

// import DataTableViewOptions from './data-table-view-options';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  currentPage: number;
  totalPages: number;
  children: React.ReactNode;
}

// in case if we need to get selected rows on different component
export const selectedAtom = atom<Record<string, boolean>>({});

export const DataTable = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  currentPage,
  rows,
  totalPages,
  children,
}: DataTableProps<TData, TValue>) => {
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useAtom(selectedAtom);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    rowCount: rows,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => String(row.id),
    autoResetPageIndex: false,
    state: {
      // columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <header className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
        <div>{children}</div>
        <Tablesearch placeholder="Cari Customer" />
        <AddButton>Import Follow UP</AddButton>
      </header>
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
                    data-state={row.getIsSelected() && 'selected'}
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
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        // selectedRows={Object.keys(rowSelection).length}
        // totalRows={table.getRowCount()}
      />
    </>
  );
};
