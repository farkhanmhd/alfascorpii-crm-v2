import { fetchWithParams } from '../fetchUtils';

export const fetchKeteranganHasil = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('furesult', search, page, per_page);
