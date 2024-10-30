import { fetchWithParams } from '../../fetchUtils';

export const fetchHobi = (search?: string, page?: string, per_page?: string) =>
  fetchWithParams('hobbies', search, page, per_page);
