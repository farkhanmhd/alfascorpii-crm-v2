import { fetchWithParams } from '../../fetchUtils';

export const fetchStatusRumah = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('customers/status-rumah', search, page, limit);
