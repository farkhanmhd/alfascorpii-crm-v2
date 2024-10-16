import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/fragments/table/table';
import clsx from 'clsx';
import { IStaff } from '@/types';

const StaffTable = async ({ staffs }: { staffs: IStaff[] }) => {
  const staffHeader = [
    'NIP',
    'Username',
    'Name',
    'Email',
    'Status',
    'Role',
    'Action',
  ];

  return (
    <Table className="md:none order-1">
      <TableHeader>
        <TableRow>
          {staffHeader.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.length > 0 ? (
          staffs.map((staff: IStaff) => (
            <TableRow key={staff.id} className="hover:bg-muted/50">
              <TableCell>{staff.nip}</TableCell>
              <TableCell>{staff.username}</TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>
                <span
                  className={clsx({
                    'text-green-500': staff.status === 'VALID',
                    'text-yellow-500': staff.status === 'SUSPEND',
                    'text-red-500': staff.status === 'RESIGN',
                  })}
                >
                  {staff.status}
                </span>
              </TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>
                <Link
                  className="text-primary hover:underline"
                  href={`/staff/${staff.id}`}
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>No Data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StaffTable;
