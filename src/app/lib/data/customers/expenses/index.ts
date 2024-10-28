import { fetchWithParams } from '../../fetchUtils';

export const fetchPengeluaran = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('expenses', search, page, per_page);
