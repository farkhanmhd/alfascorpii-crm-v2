import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);
