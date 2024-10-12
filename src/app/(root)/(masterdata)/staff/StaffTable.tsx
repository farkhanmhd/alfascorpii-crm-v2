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
import { IStaff } from '@/types';
import { fetchStaff } from '@/app/lib/data';

const StaffTable = async ({ search = '' }: { search?: string }) => {
  const staffs: IStaff[] = await fetchStaff(search);

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
    <Table>
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
              <TableCell>{staff.status}</TableCell>
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
