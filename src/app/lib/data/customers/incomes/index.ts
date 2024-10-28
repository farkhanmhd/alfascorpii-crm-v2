import { fetchWithParams } from '../../fetchUtils';

export const fetchincome = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('incomes', search, page, per_page);
