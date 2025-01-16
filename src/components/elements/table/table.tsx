import React from 'react';

export const Table = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="overflow-hidden rounded-md">
    <table className={`w-full text-sm ${className}`}>{children}</table>
  </div>
);

export const TableHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <thead
    className={`bg-background/8 sticky top-0 z-50 backdrop-blur-lg ${className}`}
    style={{
      boxShadow: '0px .5px 0px hsl(var(--border)),',
    }}
  >
    {children}
  </thead>
);

export const TableBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr className={`border-b py-6 transition-colors ${className}`}>{children}</tr>
);

export const TableCell = ({
  children,
  className = 'text-left',
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) => (
  <td
    className={`h-12 px-4 align-middle font-medium fade-in ${className}`}
    colSpan={colSpan}
  >
    {children}
  </td>
);

export const TableHeaderCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium fade-in ${className}`}
  >
    {children}
  </th>
);
