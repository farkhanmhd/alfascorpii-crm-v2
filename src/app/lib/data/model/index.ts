import { fetchWithParams } from '../fetchUtils';

export const fetchModel = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('model', search, page, limit);
