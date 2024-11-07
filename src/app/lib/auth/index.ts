export const getUser = async (username: string, password: string) => {
  try {
    const loginResponse = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { data } = await loginResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
