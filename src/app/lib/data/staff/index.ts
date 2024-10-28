import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchStaff = (search?: string, page?: string, per_page?: string) =>
  fetchWithParams('staff', search, page, per_page);
