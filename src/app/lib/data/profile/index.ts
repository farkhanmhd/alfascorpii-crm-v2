import { getAccessToken } from '../auth';

export const changePassword = async (
  old_password: string,
  new_password: string
) => {
  const token = await getAccessToken();
  const response = await fetch(`${process.env.API_URL}/changepassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ old_password, new_password }),
  });
  const data = await response.json();
  return data;
};
