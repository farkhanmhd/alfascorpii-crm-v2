import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import FollowUpDialog from './dialogs/follow-up-dialog';
import FollowUpHistory from './dialogs/follow-up-history';

const FollowUpTab = () => {
  return (
    <div className="flex flex-col gap-y-8 px-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-primary text-sm">
            <TableRow className="hover:bg-primary">
              <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                KETERANGAN
              </TableHead>
              <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                FOLLOW UP 1
              </TableHead>
              <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                FOLLOW UP 2
              </TableHead>
              <TableHead className="px-4 py-2 font-bold uppercase text-primary-foreground">
                FOLLOW UP 3
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                PENERIMA TELEPON
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                HUBUNGAN DENGAN CUSTOMER
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                KETERANGAN LAINNYA
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                WHATSAPP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                TANGGAL
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                METODE FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                STATUS FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                KETERANGAN FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                MINAT PRODUCT
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                HASIL
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                DESKRIPSI
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 1
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 2
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                FOLLOW UP 3
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-x-4">
        <FollowUpDialog />
        <FollowUpHistory />
        <Button variant="blue">DEAL</Button>
      </div>
    </div>
  );
};

export default FollowUpTab;
