'use server';

import { z } from 'zod';
import type { User } from '@/types';

import actionClient from '@/lib/safe-action';
import { revalidatePath, revalidateTag } from 'next/cache';
import {
  postNewStaff,
  updateUser,
  activateUser,
  deactivateUser,
  resetUserPassword,
} from '../../data/staff';
import { getAccessToken } from '../../data/auth';

export const getAllUsers = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/getallusers`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['users'],
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
      revalidateTag('users');
      return { status: 'success', message: 'User added successfully' };
    } catch (error) {
      return { status: 'error', message: 'Server Error: Failed to add User' };
    }
  });

const updateUserPermissionSchema = z.object({
  uuid: z.string(),
  permissions: z.array(z.string()),
});

export const updateUserPermissionAction = actionClient
  .schema(updateUserPermissionSchema)
  .action(async ({ parsedInput: { uuid, permissions } }) => {
    const meta = await updateUser(uuid, permissions);

    const { status, message } = meta;

    return { status, message };
  });

const userUuidSchema = z.object({ uuid: z.string() });

export const activateUserAction = actionClient
  .schema(userUuidSchema)
  .action(async ({ parsedInput: { uuid } }) => {
    const meta = await activateUser(uuid);
    const { status, message } = meta;
    revalidatePath('/staff');
    return { status, message };
  });

export const deactivateUserAction = actionClient
  .schema(userUuidSchema)
  .action(async ({ parsedInput: { uuid } }) => {
    const meta = await deactivateUser(uuid);
    const { status, message } = meta;
    revalidatePath('/staff');
    return { status, message };
  });

const resetPasswordSchema = z.object({
  uuid: z.string().min(1, { message: 'User ID is required' }),
});

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { uuid } }) => {
    try {
      const result = await resetUserPassword(uuid);
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to reset password',
      };
    }
  });
