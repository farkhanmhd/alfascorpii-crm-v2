import { fetchWithParams } from '../../fetchUtils';

export const fetchPengeluaran = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('customers/pengeluaran', search, page, limit);
