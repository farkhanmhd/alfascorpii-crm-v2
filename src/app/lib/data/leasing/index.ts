import { fetchWithParams } from '../fetchUtils';

export const fetchLeasing = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('leasing', search, page, limit);
