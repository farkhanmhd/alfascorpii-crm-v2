import { fetchWithParams } from '../fetchUtils';
import { getAccessToken } from '../auth';

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

export const randomAssignFollowUp = async (payload: {
  amount: number;
  user_id: string;
}) => {
  const token = await getAccessToken();
  const requestUrl = `${process.env.BACKEND_URL}/customers/randomassign`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const { meta } = await response.json();
  return meta;
};
