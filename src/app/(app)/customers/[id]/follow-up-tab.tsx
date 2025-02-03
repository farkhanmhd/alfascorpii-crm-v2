import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DealDialog from '@/components/elements/dialogs/deal-dialog';
import type { ICustomerFollowUp } from '@/types';
import { OptionsProps } from '@/types';
import FollowUpDialog from './dialogs/follow-up-dialog';
import FollowUpHistory from './dialogs/follow-up-history';

interface Props extends OptionsProps {
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

  return (
    <div className="mb-8 flex flex-col gap-y-6">
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
                {getFieldOrDefault(props.followUps.length - 1, 'user')}
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
                {getFieldOrDefault(props.followUps.length - 1, 'recipient')}
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
                {getFieldOrDefault(props.followUps.length - 1, 'relationship')}
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
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
                {getFieldOrDefault(
                  props.followUps.length - 1,
                  'follow_up_note'
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <FollowUpDialog {...(props as Omit<Props, 'followUps'>)} />
        <FollowUpHistory followUps={props.followUps} />
        <DealDialog {...props} />
      </div>
    </div>
  );
};

export default FollowUpTab;
