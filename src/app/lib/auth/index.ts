export const getUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const { data: loginData } = await response.json();
    return loginData;
  } catch (error) {
    return error;
  }
};
