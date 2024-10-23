import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchDealer = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('dealer', search, page, limit);
