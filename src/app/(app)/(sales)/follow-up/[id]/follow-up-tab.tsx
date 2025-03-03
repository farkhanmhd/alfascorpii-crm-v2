'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ICustomer, ICustomerFollowUp } from '@/types';
import { OptionsProps } from '@/types';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DealDialog from '@/components/elements/dialogs/deal-dialog';
import FollowUpDialog from './dialogs/follow-up-dialog';
import FollowUpHistory from './dialogs/follow-up-history';

interface Props extends OptionsProps {
  customer: ICustomer;
  followUps: ICustomerFollowUp[];
}

const FollowUpTab = ({ ...props }: Props) => {
  const getFieldOrDefault = (
    index: number,
    field: keyof ICustomerFollowUp,
    defaultValue: string = '-'
  ) => {
    return props.followUps[index]?.[field] ?? defaultValue;
  };

  const { state } = useSidebar();

  return (
    <div className="mb-8 flex flex-col gap-y-6">
      <ScrollArea
        className={cn(
          'max-h-[800px] max-w-[calc(100svw-72px)] rounded-md bg-white shadow-sm',
          {
            'md:max-w-[calc(100svw-354px)]': state === 'expanded',
            'md:max-w-[calc(100svw-144px)]': state === 'collapsed',
          }
        )}
      >
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
          <TableBody className="bg-white font-medium">
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                CRO
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'user')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'user')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(props.followUps.length - 1, 'user')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                PENERIMA TELEPON
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'recipient')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'recipient')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(props.followUps.length - 1, 'recipient')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                HUBUNGAN DENGAN CUSTOMER
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'relationship')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'relationship')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(props.followUps.length - 1, 'relationship')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                KETERANGAN LAINNYA
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'additional_information')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'additional_information')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'additional_information'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                WHATSAPP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'whatsapp_number')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'whatsapp_number')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'whatsapp_number'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                TANGGAL
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_date')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_date')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_date'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                METODE FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_method')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_method')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_method'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                STATUS FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_status')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_status')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_status'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                KETERANGAN FOLLOW UP
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_detail')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_detail')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_detail'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                MINAT PRODUCT
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'product_preferences')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'product_preferences')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'product_preferences'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                HASIL
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_result')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_result')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_result'
                  )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-12 px-4 py-2 text-xs font-bold sm:text-sm">
                CATATAN
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(0, 'follow_up_note')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {getFieldOrDefault(1, 'follow_up_note')}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs sm:text-sm">
                {props.followUps.length > 2 &&
                  getFieldOrDefault(
                    props.followUps.length - 1,
                    'follow_up_note'
                  )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col gap-4 md:flex-row">
        <FollowUpDialog {...(props as Omit<Props, 'followUps'> | any)} />
        <FollowUpHistory followUps={props.followUps} />
        <DealDialog {...props} />
      </div>
    </div>
  );
};

export default FollowUpTab;
