import { fetchWithParams } from '../../fetchUtils';

export const fetchKerabat = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('relations', search, page, per_page);
