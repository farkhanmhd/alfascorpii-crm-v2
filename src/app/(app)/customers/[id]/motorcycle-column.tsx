import { ColumnDef } from '@tanstack/react-table';
import { ICustomerMotorcycle } from '@/types';

const columns: ColumnDef<ICustomerMotorcycle>[] = [
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
    id: 'production_year',
    header: 'Tahun Produksi',
  },
  {
    accessorKey: 'purchase_date',
    header: 'Tanggal Beli',
  },
  {
    id: 'dealer',
    header: 'Dealer',
  },
];

export default columns;
