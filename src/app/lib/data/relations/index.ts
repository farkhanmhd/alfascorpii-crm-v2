import { getAccessToken } from '../auth';
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

export const getRelationOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${process.env.API_URL}/relations?per_page=9999`,
      {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['relations'],
        },
      }
    );

    const { data } = await response.json();
    const { relations } = data;
    const relationsOpts = relations
      .filter((relation: any) => relation.status === 'SHOW')
      .map((relation: any) => ({
        label: relation.relation_name,
        value: String(relation.id),
      }));

    return relationsOpts;
  } catch (error) {
    return [];
  }
};
