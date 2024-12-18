import { ColumnDef } from '@tanstack/react-table';
import { IMotorcycle } from '@/types';

const columns: ColumnDef<IMotorcycle>[] = [
  {
    accessorKey: 'name',
    header: 'Type',
  },
  {
    accessorKey: 'color',
    header: 'Warna',
  },
  {
    accessorKey: 'frame_number',
    header: 'No.Rangka',
  },
  {
    accessorKey: 'engine_number',
    header: 'No.Mesin',
  },
  {
    accessorKey: 'payment_method',
    header: 'Pembelian',
  },
  {
    accessorKey: 'leasing_name',
    header: 'Leasing',
  },
  {
    accessorKey: 'purchase_date',
    header: 'Tanggal Beli',
  },
];

export default columns;
