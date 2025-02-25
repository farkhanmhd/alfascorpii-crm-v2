import { paramsGenerator } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export interface IFUFilters {
  page?: string;
  per_page?: string;
  search?: string;
  follow_up_detail_id?: string;
  follow_up_result_id?: string;
  dealer_id?: string;
  date_field?:
    | 'purchase_date'
    | 'follow_up_date'
    | 'assigned_date'
    | 'date_of_birth';
  date_from?: string;
  date_to?: string;
  user_id?: string;
  motorcycle_id?: string;
}

export const getFollowUps = async (payload: IFUFilters) => {
  try {
    const params = paramsGenerator(payload);
    const url = `${process.env.API_URL}/followups?${params}`;
    const accessToken = await getAccessToken();

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

export interface IDuplicateFilters {
  page?: string;
  per_page?: string;
  search?: string;
  dealer_id?: string;
  date_field?:
    | 'purchase_date'
    | 'follow_up_date'
    | 'assigned_date'
    | 'date_of_birth';
  date_from?: string;
  date_to?: string;
  user_id?: string;
  motorcycle_id?: string;
}

export const getDuplicatedData = async (payload: IDuplicateFilters) => {
  try {
    const accessToken = await getAccessToken();

    const params = paramsGenerator(payload);

    const url = `${process.env.API_URL}/duplicatedata?${params}`;

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
    const { duplicatedatas, last_page: lastPage, total } = data;
    return { duplicatedatas, lastPage, total };
  } catch (error) {
    console.error(error);
    return { duplicatedatas: [], lastPage: 0, total: 0 };
  }
};

export const randomAssignFollowUp = async (payload: {
  amount: number;
  user_id: string;
}) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      redirect('/login');
    }
    const requestUrl = `${process.env.API_URL}/customers/randomassign`;
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
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};

export const manualAssignFollowUp = async (payload: {
  customer_ids: number[];
  user_id: string;
}) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      redirect('/login');
    }

    const requestUrl = `${process.env.API_URL}/customers/manualassign`;

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
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};

export type FollowUpData = {
  customer_id: number;
  recipient_name?: string;
  relation_id?: number;
  whatsapp_number?: string;
  additional_information?: string;
  follow_up_date?: string;
  follow_up_method_id?: number;
  follow_up_status_id?: number;
  follow_up_detail_id?: number;
  follow_up_result_id?: number;
  follow_up_note?: string;
  product_preferences_id?: number;
  update_data?: {
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
    facebook?: string;
    instagram?: string;
    email?: string;
    income_id?: number;
    expense_id?: number;
    holiday_id?: number;
    religion_id?: number;
  };
};

export const addFollowUp = async (payload: FollowUpData) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      redirect('/login');
    }
    const requestUrl = `${process.env.API_URL}/customers/${payload.customer_id}/followup`;

    const bodyPayload = Object.fromEntries(
      Object.entries(payload).filter(([key]) => key !== 'customer_id')
    );

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    const { meta } = await response.json();
    return meta;
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};
