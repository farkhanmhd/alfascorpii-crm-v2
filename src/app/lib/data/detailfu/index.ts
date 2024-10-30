import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchDetailFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('detailfu', search, page, per_page);
