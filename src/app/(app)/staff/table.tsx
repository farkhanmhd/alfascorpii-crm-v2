'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { cn, checkPermission } from '@/lib/utils';

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
import { useSidebar } from '@/components/ui/sidebar';
import DataTablePagination from '@/components/elements/table/pagination';
import { usePermissions } from '@/hooks';

interface DataTableProps<
  TData extends { id?: string | number; uuid?: string },
  TValue,
> {
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
}

export const DataTable = <
  TData extends { id?: string | number; uuid?: string },
  TValue,
>({
  columns,
  data,
  rows,
  totalPages,
  currentPage = 1,
  children,
  withPagination = false,
  rowSelection = {},
  setRowSelection,
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get('per_page') || 50);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { state } = useSidebar();
  const { push } = useRouter();
  const { permissions } = usePermissions();
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
    state: {
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: perPage,
      },
    },
  });

  const canView = checkPermission('view_user_list', permissions);

  return (
    <>
      <ScrollArea
        className={cn(
          'max-w-[calc(100svw-48px)] rounded-md bg-white shadow-sm',
          {
            'md:max-w-[calc(100svw-304px)]': state === 'expanded',
            'md:max-w-[calc(100svw-96px)]': state === 'collapsed',
          }
        )}
      >
        <div className="h-auto max-h-[800px]">
          <Table>
            <TableHeader className="sticky top-0 z-50 bg-primary text-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-primary">
                  <MapItems
                    of={headerGroup.headers}
                    render={(header, key) => (
                      <TableHead
                        key={key}
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <MapItems
                  of={table.getRowModel().rows}
                  render={(row, key) => (
                    <TableRow
                      className={cn('hover:bg-black/10', {
                        'cursor-pointer': canView,
                      })}
                      key={key}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => {
                        if (canView) {
                          push(`/staff/${row.original.uuid}`);
                        }
                      }}
                    >
                      <MapItems
                        of={row.getVisibleCells()}
                        render={(cell, cellkey) => (
                          <TableCell
                            key={cellkey}
                            className="h-12 px-4 py-2 text-xs font-medium sm:text-sm"
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
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </div>
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
    </>
  );
};
