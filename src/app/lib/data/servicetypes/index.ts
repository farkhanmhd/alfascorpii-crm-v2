import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchServiceTypes = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('servicetypes', search, page, per_page);

export const postServiceType = (service_name: string) => {
  return fetchData({
    endpoint: 'servicetypes',
    method: 'POST',
    body: {
      service_name,
    },
  });
};

export const putServiceType = (id: number, service_name: string) => {
  return fetchData({
    endpoint: `servicetypes/${id}`,
    method: 'PUT',
    body: { service_name },
  });
};

export const deleteServiceType = (id: number) => {
  return deleteData({
    endpoint: `servicetypes/${id}`,
    method: 'DELETE',
  });
};

export const getServiceTypeOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${process.env.API_URL}/servicetypes?per_page=9999`,
      {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data } = await response.json();
    const { servicetypes } = data;
    const serviceTypesList = servicetypes.map((type: any) => ({
      label: type.service_name,
      value: String(type.id),
    }));

    return serviceTypesList;
  } catch (error) {
    return [];
  }
};
