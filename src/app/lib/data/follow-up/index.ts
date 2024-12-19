import { fetchWithParams } from '../fetchUtils';

export const getFollowUps = async (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('followupqueues', search, page, per_page);

export const getDuplicatedData = async (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('duplicatedata', search, page, per_page);
