import { fetchWithParams, fetchData } from '../../fetchUtils';
import { cookies } from 'next/headers';

export const getCustomerJobs = (
  search?: string,
  page?: string,
  per_page?: string
) => {
  return fetchWithParams('customerjobs', search, page, per_page);
};

export const getCustomerJobById = async (id: string) => {
  return fetchData(`customerjobs/${id}`);
};

export const postPekerjaan = async (
  job: string,
  code: string,
  status: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('at');
  await fetch(`${process.env.BACKEND_URL}/customerjobs`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify({
      job_code: code,
      job_name: job,
      status,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to post pekerjaan');
    }
  });
};

export const putPekerjaan = async (
  id: string | number,
  job: string,
  code: string,
  status: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('at');
  await fetch(`${process.env.BACKEND_URL}/customerjobs/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify({
      job_name: job,
      job_code: code,
      status,
    }),
  }).then(async (res) => {
    if (!res.ok) {
      console.error(res.statusText);
      throw new Error('Failed to update pekerjaan');
    }
  });
};

export const deletePekerjaan = async (id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('at');
  const response = await fetch(
    `${process.env.BACKEND_URL}/customerjobs/${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete pekerjaan');
  }
};
