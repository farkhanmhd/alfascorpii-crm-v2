import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchDegree = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('degrees', search, page, per_page);

export const postDegree = async (
  degree: string,
  code: string,
  status: string
) => {
  return fetchData({
    endpoint: `degrees`,
    method: 'POST',
    body: { degree_code: code, degree_name: degree, status },
  });
};

export const putDegree = async (
  id: number,
  degree: string,
  code: string,
  status: string
) => {
  return fetchData({
    endpoint: `degrees/${id}`,
    method: 'PUT',
    body: { degree_code: code, degree_name: degree, status },
  });
};

export const deleteDegree = async (id: number) => {
  return deleteData({
    endpoint: `degrees/${id}`,
  });
};
