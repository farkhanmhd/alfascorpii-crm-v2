import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchProductPreferences = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('productpreferences', search, page, per_page);
