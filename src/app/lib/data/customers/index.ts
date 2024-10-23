import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchCustomer = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('customers', search, page, limit);
