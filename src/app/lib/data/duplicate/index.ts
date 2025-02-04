import { redirect } from 'next/navigation';
import { getAccessToken } from '../auth';

export const deleteDuplicate = async (payload: { ids: number[] }) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      redirect('/login');
    }

    console.log(JSON.stringify(payload));
    const requestUrl = `${process.env.API_URL}/duplicatedata/batchDelete`;
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
  } catch (error) {
    console.error(error);
    return { meta: { message: 'Internal Server Error' } };
  }
};
