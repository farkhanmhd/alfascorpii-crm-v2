import { fetchWithParams } from '../fetchUtils';

export const fetchKeteranganHasil = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('keterangan-hasil', search, page, limit);
