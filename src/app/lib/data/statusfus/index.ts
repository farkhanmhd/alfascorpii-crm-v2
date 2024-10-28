import { fetchWithParams } from '../fetchUtils';

export const fetchKeteranganFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('statusfus', search, page, per_page);
