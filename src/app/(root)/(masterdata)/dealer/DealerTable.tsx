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
import { IDealer } from '@/types';

const DealerTable = async ({ dealers }: { dealers: IDealer[] }) => {
  const staffHeader = ['No', 'Kode', 'Dealer', 'Status', 'Actions'];

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
        {dealers.length > 0 ? (
          dealers.map((dealer: IDealer, index) => (
            <TableRow key={dealer.id} className="hover:bg-muted/50">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{dealer.kode}</TableCell>
              <TableCell>{dealer.nama}</TableCell>
              <TableCell>
                <span
                  className={clsx({
                    'text-green-500': dealer.status === 'SHOW',
                    'text-red-500': dealer.status === 'HIDE',
                  })}
                >
                  {dealer.status}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  className="text-primary hover:underline"
                  href={`/dealer/${dealer.id}`}
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

export default DealerTable;
