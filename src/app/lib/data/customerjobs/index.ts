import { fetchWithParams, fetchData } from '../fetchUtils';

export const getCustomerJobs = (
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
  return fetchData({
    endpoint: `customerjobs/${id}`,
    method: 'DELETE',
  });
};
