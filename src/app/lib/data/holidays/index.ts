import { fetchWithParams } from '../fetchUtils';

export const fetchHariBesar = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('holidays', search, page, per_page);
