'use client';

import React, { useState, useEffect } from 'react';
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
async function addRowsServerAction(
  newRows: Record<string, string>[]
): Promise<{ ids: string[] }> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate server-side ID generation
  const ids = newRows.map(() => Date.now().toString());

  // In a real implementation, you would save the new rows to the database here
  console.log(
    'Adding new rows:',
    newRows.map((row, index) => ({ id: ids[index], ...row }))
  );

  return { ids };
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
  const [newRows, setNewRows] = useState<Record<string, string>[]>([]);
  const [tableData, setTableData] = useState<TData[]>(data);

  // TODO: Implement optimistic updates using useOptimistic
  // const [optimisticTableData, addOptimisticRows] = useOptimistic(
  //   tableData,
  //   (state, newRows: TData[]) => [...state, ...newRows]
  // );

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const table = useReactTable({
    data: tableData, // TODO: Replace with optimisticTableData when implementing optimistic updates
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
    setNewRows((prev) => [...prev, emptyRow]);
  };

  const handleInputChange = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    setNewRows((prev) => {
      const updatedRows = [...prev];
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], [columnId]: value };
      return updatedRows;
    });
  };

  const handleRemoveRow = (rowIndex: number) => {
    setNewRows((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const handleSave = async () => {
    if (newRows.length === 0) return;

    try {
      // TODO: Replace this with the actual server action when implementing
      const { ids } = await addRowsServerAction(newRows);

      // TODO: When implementing optimistic updates, move this logic to the optimistic update function
      setTableData((prev) => [
        ...prev,
        ...(newRows.map((row, index) => ({
          ...row,
          id: ids[index],
        })) as TData[]),
      ]);
      setNewRows([]);

      // TODO: Implement optimistic update
      // addOptimisticRows(newRows.map((row, index) => ({ ...row, id: `temp-id-${index}` })) as TData[]);
      // const { ids } = await addRowsServerAction(newRows);
      // setTableData((prev) => [
      //   ...prev.filter(row => !row.id.toString().startsWith('temp-id-')),
      //   ...newRows.map((row, index) => ({ ...row, id: ids[index] })) as TData[]
      // ]);
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
                {extensible && <TableHead className="w-[50px]" />}
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
                    {extensible && <TableCell className="w-[50px]" />}
                  </TableRow>
                )}
              />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (extensible ? 1 : 0)}
                  className="h-12 px-4 py-2 text-center text-xs sm:text-sm"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            {extensible &&
              newRows.map((newRow, rowIndex) => (
                <TableRow key={`new-row-${rowIndex}`}>
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
                            handleInputChange(
                              rowIndex,
                              column.id as string,
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </TableCell>
                    )}
                  />
                  <TableCell className="w-[50px]">
                    <Button
                      onClick={() => handleRemoveRow(rowIndex)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
          <div className="flex items-center gap-x-4">
            {newRows.length > 0 && (
              <Button
                onClick={handleSave}
                variant="blue"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save {newRows.length} row{newRows.length > 1 ? 's' : ''}
              </Button>
            )}
            <Button onClick={handleAddRow} variant="orange" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {newRows.length > 0 && (
            <Button onClick={() => setNewRows([])}>Cancel</Button>
          )}
        </div>
      )}
    </>
  );
};
