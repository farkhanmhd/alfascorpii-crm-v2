import { fetchWithParams } from '../../fetchUtils';

export const fetchPendidikan = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('customers/pendidikan', search, page, limit);
