import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchCustomerJobs = (
  search?: string,
  page?: string,
  per_page?: string
) => {
  return fetchWithParams('customerjobs', search, page, per_page);
};

export const postJob = async (job: string, code: string, status: string) => {
  return fetchData({
    endpoint: 'customerjobs',
    method: 'POST',
    body: { job_code: code, job_name: job, status },
  });
};

export const putPekerjaan = async (
  id: string | number,
  job: string,
  code: string,
  status: string
) => {
  return fetchData({
    endpoint: `customerjobs/${id}`,
    method: 'PUT',
    body: { job_code: code, job_name: job, status },
  });
};

export const deletePekerjaan = async (id: number) => {
  return deleteData({
    endpoint: `customerjobs/${id}`,
  });
};

export const getJobOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/customerjobs`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['customerjobs'],
      },
    });

    const {
      data: { jobs },
    } = await response.json();

    const options = jobs.map((option: any) => {
      return {
        label: option.job_name,
        value: String(option.id),
      };
    });

    options.unshift({
      label: 'Semua',
      value: 'all',
    });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
};
