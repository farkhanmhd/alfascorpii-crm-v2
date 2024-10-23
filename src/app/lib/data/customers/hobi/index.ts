import { fetchWithParams } from '../../fetchUtils';

export const fetchHobi = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('customers/hobi', search, page, limit);
