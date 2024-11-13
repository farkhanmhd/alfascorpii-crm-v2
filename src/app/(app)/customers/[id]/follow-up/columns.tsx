'use client';

import { IFollowUp, Column } from '@/types';

const columns: Column<IFollowUp>[] = [
  {
    header: 'Follow Up #',
    key: 'follow_up',
    GetCellContent: (fu: IFollowUp) => fu.follow_up,
  },
  {
    header: 'Receiver',
    key: 'phone_receiver',
    GetCellContent: (fu: IFollowUp) => fu.phone_receiver,
  },
  {
    header: 'Relationship',
    key: 'relationship',
    GetCellContent: (fu: IFollowUp) => fu.relationship,
  },
  {
    header: 'Whatsapp',
    key: 'whatsapp',
    GetCellContent: (fu: IFollowUp) => fu.whatsapp,
  },
  {
    header: 'Date',
    key: 'date',
    GetCellContent: (fu: IFollowUp) => fu.date,
  },
  {
    header: 'Method',
    key: 'method',
    GetCellContent: (fu: IFollowUp) => fu.method,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (fu: IFollowUp) => fu.status,
  },
  {
    header: 'Result',
    key: 'result',
    GetCellContent: (fu: IFollowUp) => fu.result,
  },
  {
    header: 'Motorcycle',
    key: 'motorcycle',
    GetCellContent: (fu: IFollowUp) => fu.motorcycle,
  },
];

export default columns;
