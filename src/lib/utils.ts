import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from '@/hooks/use-toast';
import { Permission } from './permissions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateToISO(
  dateString: string,
  targetDate: string,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
): string {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const [targetYear, targetMonth, targetDay] = targetDate
    .split('-')
    .map(Number);
  date.setFullYear(targetYear, targetMonth - 1, targetDay);
  date.setUTCHours(hours, minutes, seconds, milliseconds);
  return date.toISOString();
}

export const getErrorMessages = (errorObj?: { _errors?: string[] }) =>
  errorObj?._errors || [];

export const delay = (waitingTime: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitingTime);
  });
};

export const actionResponseToast = (actionResult: any) => {
  if (actionResult?.result?.data?.status === 'success') {
    toast({
      title: 'Success',
      description: actionResult?.result?.data?.message,
      duration: 3000,
    });
  } else if (actionResult?.result?.data?.status === 'error') {
    toast({
      title: 'Error',
      description: actionResult?.result?.data?.message,
      variant: 'destructive',
      duration: 3000,
    });
  }
};

export const paramsGenerator = (params: any) => {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      queryParams.set(key, params[key]);
    }
  });
  return queryParams.toString().replace(/%2C/g, ',');
};

export const checkPermission = (
  permissionName: string,
  permissions: Permission[]
): boolean => {
  if (permissions) {
    return permissions.some(
      (permission) => permission.permission_name === permissionName
    );
  }
  return false;
};

export const hasAllPermissions = (
  requiredPermissions: string[],
  permissions: Permission[]
): boolean => {
  return requiredPermissions.every((perm) =>
    checkPermission(perm, permissions)
  );
};

export const sanitizeValue = (value: any) =>
  value !== undefined && value !== null && String(value).trim() !== ''
    ? String(value)
    : '-';
