import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchDealer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('dealers', search, page, per_page);
