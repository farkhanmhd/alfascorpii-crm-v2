import { fetchWithParams } from '../fetchUtils';

export const getFollowUps = async (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('showfollowupdata', search, page, per_page);
