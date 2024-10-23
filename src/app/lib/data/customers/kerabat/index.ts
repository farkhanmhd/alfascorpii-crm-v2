import { fetchWithParams } from '../../fetchUtils';

export const fetchKerabat = (search?: string, page?: string, limit?: string) =>
  fetchWithParams('customers/kerabat', search, page, limit);
