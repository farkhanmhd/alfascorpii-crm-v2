import { redirect } from 'next/navigation';
import { fetchWithParams } from '../fetchUtils';
import { getAccessToken } from '../auth';

const paramsGenerator = (params: any) => {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      queryParams.set(key, params[key]);
    }
  });
  return queryParams.toString();
};

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

// export const getFollowUps = async (
//   search?: string,
//   page?: string,
//   per_page?: string
// ) => fetchWithParams('followups', search, page, per_page);

export const getFollowUps = async (payload: IFUFilters) => {
  const params = paramsGenerator(payload);
  const url = `${process.env.BACKEND_URL}/followups?${params}`;
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
};

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
