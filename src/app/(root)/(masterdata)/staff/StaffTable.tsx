import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/fragments/table/table';
import { fetchStaff } from '@/app/lib/data';
import { IStaff } from '@/app/api/staff/route';
import { ScrollArea } from '@/components/ui/scrollarea';

const StaffTable = async () => {
  const staff = await fetchStaff();

  const staffHeader = [
    'ID',
    'Username',
    'Name',
    'Email',
    'Status',
    'Role',
    'Created At',
    'Updated At',
    'Actions',
  ];

  return (
    <div className="hide-scrollbar h-[calc(100vh-268px)] overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {staffHeader.map((header) => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff ? (
            staff.map((staff: IStaff) => (
              <TableRow key={staff.id} className="hover:bg-muted/50">
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.username}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.status}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  {new Date(staff.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(staff.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell>Delete or Edit</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffTable;
