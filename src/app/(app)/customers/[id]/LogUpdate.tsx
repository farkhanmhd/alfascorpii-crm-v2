import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

const LogUpdate = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="font-bold">LOG UPDATE</h2>
      <div className="flex flex-col gap-y-8">
        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader className="bg-primary text-sm">
              <TableRow className="hover:bg-primary">
                <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                  keterangan
                </TableHead>
                <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                  waktu
                </TableHead>
                <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                  nama cro
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              <TableRow>
                <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                  Update Data Customer
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 1
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                  Update Data Follow Up
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 1
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                  Update Data Penerima Telepon
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 1
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                  Update Data Kartu Keluarga
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 1
                </TableCell>
                <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                  FOLLOW UP 2
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LogUpdate;
