import { fetchWithParams } from '../fetchUtils';

export const fetchMetodeFU = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('metode-fu', search, page, limit);
