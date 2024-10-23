import DatabaseService from '@/services';

interface CustomerSearchFilter {
  [key: string]: string;
}

export default class CustomersServive extends DatabaseService {
  static async getAllCustomers(page: number, limit: number, search?: string) {
    const filterConfig: CustomerSearchFilter = {
      dealer: 'dealer',
      name: 'name',
      lokasi: 'lokasi',
      phone: 'phone',
      motor: 'motor',
    };

    const { data: customers, totalPages } = await CustomersServive.getAll(
      'customer',
      page,
      limit,
      search,
      filterConfig
    );

    return { customers, totalPages };
  }
}
