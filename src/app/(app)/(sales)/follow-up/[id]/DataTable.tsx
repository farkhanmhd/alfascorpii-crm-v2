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
  Row,
} from '@tanstack/react-table';
import { format } from 'date-fns';

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
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import DataTablePagination from '@/components/elements/table/pagination';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

export type InputType = 'text' | 'number' | 'date' | 'select' | 'radio';

export interface ColumnConfig {
  inputType: InputType;
  validate?: (value: string) => boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows?: number;
  totalPages?: number;
  currentPage?: number;
  children?: React.ReactNode;
  withPagination?: boolean;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  editable?: boolean;
  columnConfig?: Record<string, ColumnConfig>;
  renderInput?: (
    columnId: string,
    value: string,
    onChange: (value: string) => void,
    config: ColumnConfig
  ) => React.ReactNode;
  onRowsChange?: (rows: TData[]) => void;
  data: TData[];
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;
  onMoveRow?: (rowIndex: number) => void;
  isTopTable: boolean;
}

export const DataTable = <TData, TValue>({
  columns,
  rows,
  totalPages,
  currentPage = 1,
  children,
  withPagination = false,
  rowSelection = {},
  setRowSelection,
  editable = false,
  columnConfig = {},
  renderInput = () => null,
  onRowsChange,
  data,
  setData = () => {},
  onMoveRow,
  isTopTable,
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get('per_page') || 10);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { state } = useSidebar();

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
    getRowId: (row: any) => row.id,
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
    const newRow = columns.reduce(
      (acc, column) => {
        if (columnConfig[column.id as string].inputType === 'date') {
          acc[column.id as keyof TData] = format(
            new Date(),
            'yyyy-MM-dd'
          ) as any;
        } else {
          acc[column.id as keyof TData] = '' as any;
        }
        return acc;
      },
      { id: `new-${Date.now()}` } as TData
    );

    setData((prev: TData[]) => [...prev, newRow]);

    if (onRowsChange) {
      onRowsChange([...data, newRow]);
    }
  };

  const handleInputChange = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    setData((prev) => {
      const updatedRows = [...prev];
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], [columnId]: value };
      return updatedRows;
    });
    if (onRowsChange) {
      onRowsChange(data);
    }
  };

  const handleRemoveRow = (rowIndex: number) => {
    setData((prev) => prev.filter((_, index) => index !== rowIndex));

    if (onRowsChange) {
      onRowsChange(data.filter((_, index) => index !== rowIndex));
    }
  };

  const renderEmptyEditableRow = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.id as string} className="h-12 px-4 py-2">
          {renderInput(
            column.id as string,
            '',
            (value) => handleInputChange(0, column.id as string, value),
            columnConfig[column.id as string]
          )}
        </TableCell>
      ))}
      <TableCell className="w-[50px]" />
    </TableRow>
  );

  return (
    <>
      <ScrollArea
        className={cn(
          'max-h-[800px] max-w-[calc(100svw-48px)] rounded-md bg-white shadow-sm',
          {
            'md:max-w-[calc(100svw-354px)]': state === 'expanded',
            'md:max-w-[calc(100svw-144px)]': state === 'collapsed',
          }
        )}
      >
        <Table>
          <TableHeader className="sticky top-0 z-50 bg-primary text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-primary">
                <MapItems
                  of={headerGroup.headers}
                  render={(header, index) => (
                    <TableHead
                      key={`header-row-${index}`}
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
                {editable && <TableHead className="w-[100px]" />}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {data.length ? (
              data.map((rowData: any, rowIndex) => {
                const row = table.getRowModel().rows[rowIndex] as Row<TData>;
                return (
                  <TableRow
                    key={`body-row-${rowIndex}`}
                    data-state={
                      rowSelection[String(rowData.id) || rowIndex] && 'selected'
                    }
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id || index}
                        className="h-12 px-4 py-2 text-xs font-medium sm:text-sm"
                      >
                        {editable
                          ? renderInput(
                              cell.column.id,
                              String(cell.getValue()),
                              (value) =>
                                handleInputChange(
                                  rowIndex,
                                  cell.column.id,
                                  value
                                ),
                              columnConfig[cell.column.id]
                            )
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    ))}
                    {editable && (
                      <TableCell className="px-4 py-2">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => onMoveRow && onMoveRow(rowIndex)}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            {isTopTable ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUp className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => handleRemoveRow(rowIndex)}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : editable && data.length > 0 ? (
              renderEmptyEditableRow()
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (editable ? 1 : 0)}
                  className="h-12 px-4 py-2 text-center text-xs sm:text-sm"
                >
                  No data.
                </TableCell>
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
      {editable && (
        <div className="mt-4 flex flex-row-reverse justify-between">
          <div className="flex items-center gap-x-4">
            <Button onClick={handleAddRow} variant="orange" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
