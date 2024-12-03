'use client';

import React from 'react';
import { z } from 'zod';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { ICustomer } from '@/types';
import { OverviewTab, ExtendedTab, SocialTab } from './tabs';

const profileFormSchema = z.object({
  dealer: z
    .string()
    .min(2, { message: 'Dealer must be at least 2 characters.' }),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  phone: z
    .string()
    .min(2, { message: 'Phone must be at least 2 characters.' })
    .regex(/^\+?\d+$/, { message: 'Phone must only contain numbers.' }),
  sub_district: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  district: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  city: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  house_ownership_status: z.string().min(2, {
    message: 'House Ownership must be at least 2 characters.',
  }),
  job_name: z.string().min(2, {
    message: 'Job must be at least 2 characters.',
  }),
  date_of_birth: z.date({
    required_error: 'Date of Birth is required.',
  }),
  hobby_name: z.string().min(2, {
    message: 'Hobby must be at least 2 characters.',
  }),
  holiday_name: z.string().min(2, {
    message: 'Holiday must be at least 2 characters.',
  }),
  income_upper_limit: z.string().min(2, {
    message: 'Income Code must be at least 2 characters.',
  }),
  expense_upper_limit: z.string().min(2, {
    message: 'Expense Code must be at least 2 characters.',
  }),
});

const ProfileForm = ({
  value,
  customer,
}: {
  value: 'overview' | 'extended' | 'social';
  customer: ICustomer;
}) => {
  return (
    <form>
      <OverviewTab value={value} customer={customer} />
      <ExtendedTab value={value} customer={customer} />
      <SocialTab value={value} customer={customer} />

      <SubmitButton>Update Customer Data</SubmitButton>
    </form>
  );
};

export default ProfileForm;
