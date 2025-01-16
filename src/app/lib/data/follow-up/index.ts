import { redirect } from 'next/navigation';
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
  if (!token) {
    redirect('/login');
  }
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

export const manualAssignFollowUp = async (payload: {
  customerIds: number[];
  user_id: string;
}) => {
  const token = await getAccessToken();
  if (!token) {
    redirect('/login');
  }
  const requestUrl = `${process.env.BACKEND_URL}/customers/manualassign`;
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
