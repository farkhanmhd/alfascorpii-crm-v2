import { fetchWithParams } from '../../fetchUtils';

export const fetchPenghasilan = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('customers/penghasilan', search, page, limit);
