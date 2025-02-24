'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
import { usePermissions } from '@/hooks';
import { checkPermission, cn } from '@/lib/utils';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows?: number;
  currentPage?: number;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export const DataTable = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  currentPage = 1,
  rowSelection = {},
  setRowSelection,
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get('per_page') || 50);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { push } = useRouter();
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
    enableRowSelection: (row: any) => !row.original.user,
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

  const { permissions } = usePermissions();

  const canView =
    checkPermission('sales_fu_view_detail_customer_data', permissions) &&
    checkPermission('sales_customer_view_detail_customer_data', permissions);

  return (
    <ScrollArea className="max-h-[800px] rounded-md bg-white shadow-sm">
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <MapItems
              of={table.getRowModel().rows}
              render={(row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('hover:bg-black/10', {
                    'cursor-pointer': canView,
                  })}
                  onClick={(e) => {
                    if (
                      e.target instanceof HTMLElement &&
                      (e.target.role === 'checkbox' ||
                        e.target.getAttribute('role') === 'checkbox')
                    ) {
                      return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    if (canView) {
                      push(`/customers/${row.original.id}`);
                    }
                  }}
                >
                  <MapItems
                    of={row.getVisibleCells()}
                    render={(cell) => (
                      <TableCell
                        key={cell.id}
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
    </ScrollArea>
  );
};
