import React from 'react';

export const Table = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="hide-scrollbar h-[calc(100vh-268px)] overflow-auto rounded-md border">
    <table className={`w-full text-sm ${className}`}> {children}</table>
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
    className={`sticky top-0 z-10 border-b bg-background ${className}`}
    style={{ boxShadow: '0px 0px 0px .5px hsl(var(--border))' }}
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
}) => <tr className={`border-b transition-colors ${className}`}>{children}</tr>;

export const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`h-12 px-4 text-left align-middle font-medium ${className}`}>
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
  <th className={`h-12 px-4 text-left align-middle font-medium ${className}`}>
    {children}
  </th>
);
