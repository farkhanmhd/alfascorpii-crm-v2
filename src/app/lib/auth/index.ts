import axios from '@/lib/axios';

export const getUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('/login', { username, password });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    return error;
  }
};
