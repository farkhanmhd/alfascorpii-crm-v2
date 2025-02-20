import { ColumnDef } from '@tanstack/react-table';
import { IFollowUp } from '@/types';

const columns: ColumnDef<IFollowUp>[] = [
  {
    accessorKey: 'follow_up',
    header: '#',
  },
  {
    accessorKey: 'phone_receiver',
    header: 'Penerima',
  },
  {
    accessorKey: 'relationship',
    header: 'Relasi',
  },
  {
    accessorKey: 'whatsapp',
    header: 'Whatsapp',
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
  },
  {
    accessorKey: 'method',
    header: 'Metode',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'result',
    header: 'Hasil',
  },
  {
    accessorKey: 'motorcycle',
    header: 'Motor',
  },
];

export default columns;
