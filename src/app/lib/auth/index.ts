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

    const { data: user } = await response.json();
    return user;
  } catch (error) {
    return error;
  }
};
