import { fetchWithParams } from '../../fetchUtils';

export const fetchPendidikan = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('degrees', search, page, per_page);
