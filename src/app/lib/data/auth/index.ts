import { signIn } from 'next-auth/react';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const res = await signIn('credentials', {
      username,
      password,
      redirect: true,
    });

    if (res?.error) {
      return { success: false, message: res.error };
    }

    return { success: true, message: 'Login successful', data: res };
  } catch (error) {
    return { success: false, message: 'An unexpected error occurred', error };
  }
};
