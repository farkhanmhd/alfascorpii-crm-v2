import { fetchWithParams } from '../fetchUtils';

export const fetchKeteranganFU = (
  search?: string,
  page?: string,
  limit?: string
) => fetchWithParams('keterangan-fu', search, page, limit);
