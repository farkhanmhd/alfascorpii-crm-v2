import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';
import { revalidatePath } from 'next/cache';
import { FamilyMemberPayload } from '@/types';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);

export const importFollowUp = async (file: File) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect('/login');
  }
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.BACKEND_URL}/importdata`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const { message, errors } = await response.json();
  revalidatePath('/follow-up');
  return { message, errors };
};

export const getCustomer = async (id: number | string) => {
  return fetchData({
    endpoint: `customers/${id}`,
    method: 'GET',
    cache: 'no-cache',
  });
};

export const addFamilyCardNumber = async (
  customerId: string | number,
  family_card_number: number | string
) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect('/login');
  }
  const fetchUrl = `${process.env.BACKEND_URL}/updatefcardnumber/${customerId}`;
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ family_card_number }),
  });

  const { meta, data } = await response.json();
  return { meta, data };
};

export const updateFamilyMembers = async (
  customerId: string | number,
  family_members: FamilyMemberPayload[],
  related_people: FamilyMemberPayload[]
) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect('/login');
  }
  const fetchUrl = `${process.env.BACKEND_URL}/updatefamilymembers/${customerId}`;
  const payload = JSON.stringify({ family_members, related_people });
  const response = await fetch(fetchUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: payload,
  });

  const { meta, data } = await response.json();
  return { meta, data };
};
