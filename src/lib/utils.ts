import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const delay = (waitingTime: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitingTime);
  });
};
