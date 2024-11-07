import { fetchData } from '../data/fetchUtils';

export const getUser = async (username: string, password: string) => {
  try {
    const apiResponse = await fetchData({
      cache: 'no-store',
      endpoint: '/login',
      method: 'POST',
      body: { username, password },
    });
    return apiResponse;
  } catch (error) {
    return error;
  }
};
