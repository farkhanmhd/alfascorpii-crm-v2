import { fetchWithParams } from '@/app/lib/data/fetchUtils';

export const fetchStaff = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('staff', search, page, limit);
