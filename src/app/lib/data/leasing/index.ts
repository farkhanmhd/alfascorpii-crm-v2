import { fetchWithParams } from '../fetchUtils';

export const fetchLeasing = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('leasing', search, page, per_page);
