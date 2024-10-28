import DatabaseService from '@/services';

interface CustomerSearchFilter {
  [key: string]: string;
}

export default class CustomersServive extends DatabaseService {
  static async getAllCustomers(
    page: number,
    per_page: number,
    search?: string
  ) {
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
      per_page,
      search,
      filterConfig
    );

    return { customers, totalPages };
  }
}
