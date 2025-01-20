'use server';

import type { User } from '@/types';
import { getAccessToken } from '../../data/auth';

export const getAllUsers = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${process.env.BACKEND_URL}/getallusers`, {
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
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
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
