import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';
import { revalidatePath } from 'next/cache';
import { FamilyMemberPayload } from '@/types';

import { paramsGenerator } from '@/lib/utils';
import { getAccessToken } from '../auth';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);

export const getFilteredCustomers = async (payload: any) => {
  try {
    const accessToken = await getAccessToken();

    const params = paramsGenerator(payload);
    const url = `${process.env.API_URL}/customers?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = await response.json();
    const { customers, last_page: lastPage, total } = data;
    return { customers, lastPage, total };
  } catch (error) {
    console.error(error);
    return { customers: [], lastPage: 0, total: 0 };
  }
};

export const importFollowUp = async (file: File) => {
  const accessToken = await getAccessToken();

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.API_URL}/importdata`, {
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

  const fetchUrl = `${process.env.API_URL}/updatefcardnumber/${customerId}`;
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

  const fetchUrl = `${process.env.API_URL}/updatefamilymembers/${customerId}`;
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

type CustomerData = {
  id: string;
  customer_name?: string;
  customer_address?: string;
  province?: string;
  district?: string;
  sub_district?: string;
  regency_or_city?: string;
  postal_code?: string;
  telephone?: string;
  mobile_phone?: string;
  nik?: string;
  dealer_id?: number;
  data_source?: string;
  customer_status?: string;
  house_ownership_id?: number;
  job_id?: number;
  job_description?: string;
  date_of_birth?: string;
  religion?: string;
  degree_id?: number | null;
  hobby_id?: number;
  hobby_description?: string;
  amount_of_family?: number;
  family_under_12_yo?: number;
  family_12_until_17_yo?: number;
  amount_of_motorcycle?: number;
  whatsapp_number?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  income_id?: number;
  expense_id?: number;
  holiday_id?: number;
};

type CustomerPayload = Omit<CustomerData, 'id'>;

export const updateCustomerData = async (payload: CustomerData) => {
  try {
    const accessToken = await getAccessToken();

    const fetchUrl = `${process.env.API_URL}/customers/${payload.id}`;

    const bodyPayload: CustomerPayload = {
      ...Object.fromEntries(
        Object.entries(payload).filter(([key]) => key !== 'id')
      ),
    };

    const response = await fetch(fetchUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    return { meta: { message: 'Internal Server Error' } };
  }
};

export type RecipientData = {
  customer_id: string;
  recipient_name?: string;
  relation_id?: string | number;
  recipient_address?: string;
  sub_district?: string;
  house_ownership_id?: number;
  job_id?: number;
  recipient_job_detail?: string;
  recipient_born_date?: string;
  recipient_religion?: string;
  hobby_id?: number;
  recipient_hobby_detail?: string;
  amount_of_family?: number;
  amount_of_motorcycle?: number;
  whatsapp_number?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  income_id?: number;
  expense_id?: number;
  holiday_id?: number;
  additional_information?: string;
};

type RecipientPayload = Omit<RecipientData, 'customer_id'>;

export const updateFuRecipient = async (data: RecipientData) => {
  try {
    const accessToken = await getAccessToken();

    const bodyPayload: RecipientPayload = {
      ...Object.fromEntries(
        Object.entries(data).filter(([key]) => key !== 'customer_id')
      ),
    };

    const response = await fetch(
      `${process.env.API_URL}/updatefurecipient/${data.customer_id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyPayload),
      }
    );

    const json = await response.json();
    return json;
  } catch (error) {
    return {
      meta: {
        status: 'error',
        message: 'Failed to update recipient data',
      },
    };
  }
};
