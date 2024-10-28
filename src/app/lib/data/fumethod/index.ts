import { fetchWithParams } from '../fetchUtils';

export const fetchMetodeFU = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('fumethod', search, page, per_page);
