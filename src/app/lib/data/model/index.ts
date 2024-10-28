import { fetchWithParams } from '../fetchUtils';

export const fetchModel = (search?: string, page?: string, per_page?: string) =>
  fetchWithParams('model', search, page, per_page);
