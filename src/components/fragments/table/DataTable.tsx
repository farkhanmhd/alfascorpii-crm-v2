'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { delay } from '@/lib/utils';
import DataTablePagination from './pagination';

// TODO: Import useOptimistic when implementing optimistic updates
// import { useOptimistic } from 'react';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows?: number;
  totalPages?: number;
  currentPage?: number;
  children?: React.ReactNode;
  withPagination?: boolean;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  extensible?: boolean;
}

// TODO: Move this to a separate file when implementing the actual server action
async function addRowServerAction(
  newRow: Record<string, string>
): Promise<{ id: string }> {
  // Simulate server delay
  await delay(2000);

  // Simulate server-side ID generation
  const newId = Date.now().toString();

  // In a real implementation, you would save the new row to the database here
  console.log('Adding new row:', { id: newId, ...newRow });

  return { id: newId };
}

export const DataTable = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  totalPages,
  currentPage = 1,
  children,
  withPagination = false,
  rowSelection = {},
  setRowSelection,
  extensible = false,
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get('per_page') || 50);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [newRow, setNewRow] = useState<Record<string, string> | null>(null);
  const [tableData, setTableData] = useState<TData[]>(data);

  // TODO: Implement optimistic updates using useOptimistic
  // const [optimisticTableData, addOptimisticRow] = useOptimistic(
  //   tableData,
  //   (state, newRow: TData) => [...state, newRow]
  // );

  const table = useReactTable({
    // TODO : Replace with optimisticTableData when implementing optimistic updates
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    rowCount: rows,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => String(row.id),
    state: {
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: perPage,
      },
    },
  });

  const handleAddRow = () => {
    const emptyRow = columns.reduce(
      (acc, column) => {
        acc[column.id as string] = '';
        return acc;
      },
      {} as Record<string, string>
    );
    setNewRow(emptyRow);
  };

  const handleInputChange = (columnId: string, value: string) => {
    setNewRow((prev) => (prev ? { ...prev, [columnId]: value } : null));
  };

  const handleSave = async () => {
    if (!newRow) return;

    try {
      // TODO: Replace this with the actual server action when implementing
      const { id } = await addRowServerAction(newRow);

      // TODO: When implementing optimistic updates, move this logic to the optimistic update function
      setTableData((prev) => [...prev, { ...newRow, id } as TData]);
      setNewRow(null);

      // TODO: Implement optimistic update
      // addOptimisticRow({ ...newRow, id: 'temp-id' } as TData);
      // const { id } = await addRowServerAction(newRow);
      // setTableData((prev) => [...prev.filter(row => row.id !== 'temp-id'), { ...newRow, id } as TData]);
    } catch (error) {
      console.error('Error saving data:', error);
      // TODO: Implement error handling and rollback for optimistic updates
    }
  };

  return (
    <>
      <ScrollArea className="rounded-md">
        <Table>
          <TableHeader className="sticky top-0 z-50 bg-primary text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-primary">
                <MapItems
                  of={headerGroup.headers}
                  render={(header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-2 font-bold uppercase text-primary-foreground"
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
          <TableBody className="bg-white">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-12 px-4 py-2 text-center text-xs sm:text-sm"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            {extensible && newRow !== null && (
              <TableRow>
                <MapItems
                  of={columns}
                  render={(column) => (
                    <TableCell
                      key={column.id as string}
                      className="h-12 px-4 py-2"
                    >
                      <Input
                        value={newRow[column.id as string] || ''}
                        onChange={(e) =>
                          handleInputChange(column.id as string, e.target.value)
                        }
                        className="w-full"
                      />
                    </TableCell>
                  )}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {children}
      {withPagination && (
        <DataTablePagination
          selectedRows={Object.keys(rowSelection).length}
          total={rows as number}
          currentPage={currentPage as number}
          totalPages={totalPages as number}
        />
      )}
      {extensible && (
        <div className="mt-4 flex flex-row-reverse justify-between">
          {newRow === null && (
            <Button onClick={handleAddRow} variant="orange" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          )}
          {newRow !== null && (
            <Button variant="blue" onClick={handleSave}>
              Save
            </Button>
          )}
          {newRow !== null && (
            <Button onClick={() => setNewRow(null)}>Cancel</Button>
          )}
        </div>
      )}
    </>
  );
};
