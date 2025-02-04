import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';
import { fetchWithParams, fetchData, deleteData } from '../fetchUtils';

export const fetchHouseOwnerships = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('houseownerships', search, page, per_page);

export const postHouseOwnership = (
  house_ownership_status: string,
  status: string
) => {
  return fetchData({
    endpoint: 'houseownerships',
    method: 'POST',
    body: { house_ownership_status, status },
  });
};

export const putHouseOwnership = (
  id: number,
  house_ownership_status: string,
  status: string
) => {
  return fetchData({
    endpoint: `houseownerships/${id}`,
    method: 'PUT',
    body: { house_ownership_status, status },
  });
};

export const deleteHouseOwnership = (id: number) => {
  return deleteData({
    endpoint: `houseownerships/${id}`,
  });
};

export const getHouseOwnershipOptions = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(
      `${process.env.API_URL}/houseownerships?per_page=50`,
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
    const { houseownerships } = data;
    const houseOwnershipOptions = houseownerships.map(
      (houseownership: any) => ({
        label: houseownership.house_ownership_status,
        value: String(houseownership.id),
      })
    );

    return houseOwnershipOptions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
