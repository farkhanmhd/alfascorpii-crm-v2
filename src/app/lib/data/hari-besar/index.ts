import { fetchWithParams } from '../fetchUtils';

export const fetchHariBesar = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('hari-besar', search, page, limit);
