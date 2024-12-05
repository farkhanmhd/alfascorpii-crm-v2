import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchRelation = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('relations', search, page, per_page);

export const postRelation = (relation: string, status: string) => {
  return fetchData({
    endpoint: 'relations',
    method: 'POST',
    body: {
      relation_name: relation,
      status,
    },
  });
};

export const putRelation = (id: number, relation: string, status: string) => {
  return fetchData({
    endpoint: `relations/${id}`,
    method: 'PUT',
    body: { relation_name: relation, status },
  });
};

export const deleteRelation = (id: number) => {
  return deleteData({
    endpoint: `relations/${id}`,
    method: 'DELETE',
  });
};
