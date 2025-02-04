'use server';

import { z } from 'zod';
import type { User } from '@/types';
import { redirect } from 'next/navigation';
import actionClient from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { postNewStaff } from '../../data/staff';
import { getAccessToken } from '../../data/auth';

export const getAllUsers = async () => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(`${process.env.API_URL}/getallusers`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data }: { data: User[] } = await response.json();
    const users = data
      .filter((cro) => cro.name !== 'Admin' && cro.name !== 'Leader') // Exclude Admin and Leader
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort names alphabetically (ascending)
      .map((cro) => ({
        label: cro.name,
        value: cro.uuid,
      }));

    return users;
  } catch (error) {
    return [];
  }
};

export const getUserPermissions = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirect('/login');
    }

    const response = await fetch(`${process.env.API_URL}/user`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { permissions } = await response.json();
    return permissions;
  } catch (error) {
    return [];
  }
};

const addUserSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'username is required' })
    .max(50, { message: 'username is too long' }),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name is too long' }),
});

export const addUser = actionClient
  .schema(addUserSchema)
  .action(async ({ parsedInput: { username, name } }) => {
    try {
      await postNewStaff({ username, name });
      revalidatePath('/staff');
      return { status: 'success', message: 'User added successfully' };
    } catch (error) {
      return { status: 'error', message: 'Server Error: Failed to add User' };
    }
  });
