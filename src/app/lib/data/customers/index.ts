import { fetchWithParams } from '@/app/lib/data/fetchUtils';
import { ICustomer } from '@/types';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);

export const getCustomers = (): Promise<ICustomer[]> => {
  const dealers = ['Dealer 1', 'Dealer 2', 'Dealer 3', 'Dealer 4', 'Dealer 5'];
  const names = [
    'John Doe',
    'Jane Smith',
    'Michael Brown',
    'Emily Davis',
    'Chris Johnson',
  ];
  const locations = [
    'Medan',
    'Aceh',
    'Sumatera Utara',
    'Riau',
    'Kepulauan Riau',
  ];
  const phones = [
    '123-456-7890',
    '987-654-3210',
    '555-123-4567',
    '444-555-6666',
    '333-777-8888',
  ];
  const motors = [
    'Yamaha YZF-R15',
    'Yamaha YZF-R3',
    'Yamaha YZF-R6',
    'Yamaha YZF-R1',
    'Yamaha YZR-M1',
  ];
  const statuses = ['active', 'inactive', 'pending', 'completed'];
  const followUps = [
    'Never',
    'Follow Up 1',
    'Follow Up 2',
    'Follow Up 3',
    'Follow Up 4',
    'Follow Up 5',
  ];
  const updates = ['Updated Profile', 'No Changes', 'Address Updated'];

  const getRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split('T')[0];
  };

  const getRandomItem = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const data = Array.from({ length: 50 }, () => ({
    id: Math.ceil(Math.random() * 100),
    dealer: getRandomItem(dealers),
    name: getRandomItem(names),
    location: getRandomItem(locations),
    phone: getRandomItem(phones),
    motor: getRandomItem(motors),
    purchase_date: getRandomDate(),
    update: getRandomItem(updates),
    follow_up: getRandomItem(followUps),
    status: getRandomItem(statuses),
  }));

  return Promise.resolve(data);
};
