import { fetchWithParams } from '../../fetchUtils';

export const fetchStatusRumah = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('houseownerships', search, page, per_page);
